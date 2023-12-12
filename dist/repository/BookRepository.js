"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
let books = [];
class BookRepository {
    getAllBooks() {
        return books;
    }
    getBookById(bookId) {
        return books.find((book) => book.id === bookId);
    }
    addBook(book) {
        book.id = books.length + 1;
        books.push(book);
        return book;
    }
}
exports.BookRepository = BookRepository;
