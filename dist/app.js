"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const BookController_1 = __importDefault(require("./controller/BookController"));
const OrderController_1 = __importDefault(require("./controller/OrderController"));
// Import your database pool
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Log that the database is connected
db_1.default.connect().then(() => {
    console.log("[database]: Connected to PostgreSQL database");
});
app.use("/users", UserController_1.default);
app.use("/books", BookController_1.default);
app.use("/orders", OrderController_1.default);
// Add routes for the new HTML pages
// app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public/landing.html")));
// app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "../public/login.html")));
// app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "../public/register.html")));
// app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "../public/dashboard.html")));
// app.get("/books", (req, res) => res.sendFile(path.join(__dirname, "../public/books.html")));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
