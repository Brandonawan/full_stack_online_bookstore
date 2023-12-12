// src/service/BookService.ts
import { Book } from "../entity/Book";
import { BookRepository } from "../repository/BookRepository";

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  getAllBooks(): Book[] {
    return this.bookRepository.getAllBooks();
  }

  getBookById(bookId: number): Book | undefined {
    return this.bookRepository.getBookById(bookId);
  }

  addBook(book: Book): Book {
    return this.bookRepository.addBook(book);
  }
}
