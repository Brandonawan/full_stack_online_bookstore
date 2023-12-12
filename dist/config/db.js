"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/db.ts
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "postgres",
    password: "admin",
    port: 5432,
});
// Function to create tables if they don't exist
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const client = yield pool.connect();
        try {
            yield client.query(createUsersTable);
            yield client.query(createBooksTable);
            yield client.query(createOrdersTable);
            console.log("Tables created successfully");
        }
        catch (error) {
            console.error("Error creating tables:", error);
        }
        finally {
            client.release();
        }
    });
}
// Call the function to create tables when the app starts
createTables();
exports.default = pool;
// curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "password123"}' http://localhost:3000/users/register
// curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "password123"}' http://localhost:3000/users/login
