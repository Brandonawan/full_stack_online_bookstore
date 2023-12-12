// src/controller/BookController.ts
import express, { Request, Response } from "express";
import { BookService } from "../service/BookService";
import { Book } from "../entity/Book";
import { OrderService } from "../service/OrderService";

const router = express.Router();
const bookService = new BookService();
const orderService = new OrderService();

router.get("/", (req: Request, res: Response) => {
  const books = bookService.getAllBooks();
  console.log("books", books);
  res.status(200).json(books);
});

router.get("/:id", (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const book = bookService.getBookById(bookId);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    const { title, writer, coverImage, price, tags } = req.body;
    const book: Book = {
      id: 0,
      title,
      writer,
      coverImage,
      price,
      tags,
    };
    const addedBook = bookService.addBook(book);
    res.status(201).json(addedBook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Updated endpoint: Search books by tag
router.get("/search/tag/:tag", (req: Request, res: Response) => {
  const tag = req.params.tag.toLowerCase();
  const books = bookService.getAllBooks().filter((book) =>
    book.tags.map((t) => t.toLowerCase()).includes(tag)
  );
  res.status(200).json(books);
});

// Updated endpoint: Cancel an order
router.post("/orders/cancel/:orderId", async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.orderId);
    await orderService.cancelOrder(orderId);
    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Updated endpoint: List of bought books with pagination
router.get("/orders/bought/:userId/:page/:pageSize", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const page = parseInt(req.params.page);
    const pageSize = parseInt(req.params.pageSize);
    const boughtBooks = await orderService.getBoughtBooks(userId, page, pageSize);
    res.status(200).json(boughtBooks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
