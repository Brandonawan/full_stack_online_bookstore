// src/config/db.ts
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "postgres",
  password: "",
  port: 5432,
});

// Function to create tables if they don't exist
async function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      points INT DEFAULT 100
    );
  `;

  const createBooksTable = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      writer VARCHAR(255) NOT NULL,
      coverImage VARCHAR(255),
      price DECIMAL(10, 2) NOT NULL,
      tags VARCHAR(255)[] DEFAULT '{}'
    );
  `;

  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      book_id INT REFERENCES books(id),
      quantity INT NOT NULL,
      total_price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const client = await pool.connect();
  try {
    await client.query(createUsersTable);
    await client.query(createBooksTable);
    await client.query(createOrdersTable);

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    client.release();
  }
}

// Call the function to create tables when the app starts
createTables();

export default pool;

// curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "password123"}' http://localhost:3000/users/register
// curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "password123"}' http://localhost:3000/users/login