// src/repository/BookRepository.ts
import { Book } from "../entity/Book";

let books: Book[] = [];

export class BookRepository {
  getAllBooks(): Book[] {
    return books;
  }

  getBookById(bookId: number): Book | undefined {
    return books.find((book) => book.id === bookId);
  }

  addBook(book: Book): Book {
    book.id = books.length + 1;
    books.push(book);
    return book;
  }
}
