"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const BookRepository_1 = require("../repository/BookRepository");
class BookService {
    constructor() {
        this.bookRepository = new BookRepository_1.BookRepository();
    }
    getAllBooks() {
        return this.bookRepository.getAllBooks();
    }
    getBookById(bookId) {
        return this.bookRepository.getBookById(bookId);
    }
    addBook(book) {
        return this.bookRepository.addBook(book);
    }
}
exports.BookService = BookService;
