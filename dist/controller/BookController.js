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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/controller/BookController.ts
const express_1 = __importDefault(require("express"));
const BookService_1 = require("../service/BookService");
const OrderService_1 = require("../service/OrderService");
const router = express_1.default.Router();
const bookService = new BookService_1.BookService();
const orderService = new OrderService_1.OrderService();
router.get("/", (req, res) => {
    const books = bookService.getAllBooks();
    res.status(200).json(books);
});
router.get("/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = bookService.getBookById(bookId);
    if (book) {
        res.status(200).json(book);
    }
    else {
        res.status(404).json({ error: "Book not found" });
    }
});
router.post("/", (req, res) => {
    try {
        const { title, writer, coverImage, price, tags } = req.body;
        const book = {
            id: 0,
            title,
            writer,
            coverImage,
            price,
            tags,
        };
        const addedBook = bookService.addBook(book);
        res.status(201).json(addedBook);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Updated endpoint: Search books by tag
router.get("/search/tag/:tag", (req, res) => {
    const tag = req.params.tag.toLowerCase();
    const books = bookService.getAllBooks().filter((book) => book.tags.map((t) => t.toLowerCase()).includes(tag));
    res.status(200).json(books);
});
// Updated endpoint: Cancel an order
router.post("/orders/cancel/:orderId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = parseInt(req.params.orderId);
        yield orderService.cancelOrder(orderId);
        res.status(200).json({ message: "Order canceled successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Updated endpoint: List of bought books with pagination
router.get("/orders/bought/:userId/:page/:pageSize", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const page = parseInt(req.params.page);
        const pageSize = parseInt(req.params.pageSize);
        const boughtBooks = yield orderService.getBoughtBooks(userId, page, pageSize);
        res.status(200).json(boughtBooks);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
