// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import path from "path";

import userController from "./controller/UserController";
import bookController from "./controller/BookController";
import orderController from "./controller/OrderController";

// Import your database pool
import pool from "./config/db";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../public")));

// Log that the database is connected
pool.connect().then(() => {
  console.log("[database]: Connected to PostgreSQL database");
});

app.use("/users", userController);
app.use("/books", bookController);
app.use("/orders", orderController);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
