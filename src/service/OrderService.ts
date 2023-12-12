// src/service/OrderService.ts
import { Order } from "../entity/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { UserService } from "./UserService";
import { BookService } from "./BookService";
import { User } from "../entity/User";

export class OrderService {
  private orderRepository: OrderRepository;
  private userService: UserService; // Correct the type
  private bookService: BookService;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.userService = new UserService(); // Create an instance of UserService
    this.bookService = new BookService();
  }

  async createOrder(userId: number, bookId: number, quantity: number, totalPrice: number): Promise<Order> {
    const user = await this.userService.getUserById(userId);
  
    if (!user) {
      throw new Error("User not found");
    }
  
    const book = await this.bookService.getBookById(bookId);
  
    if (!book) {
      throw new Error("Book not found");
    }
  
    const orderTotalPrice = Math.floor(book.price * quantity);
  
    if (user.points < orderTotalPrice) {
      throw new Error("Insufficient points");
    }
  
    await this.userService.deductPoints(userId, orderTotalPrice);
  
    const order: Order = {
      id: 0,
      userId,
      bookId,
      quantity,
      totalPrice: orderTotalPrice,
      createdAt: new Date(),
    };
  
    return this.orderRepository.createOrder(order);
  }  
  
  async cancelOrder(orderId: number): Promise<void> {
    const order = await this.getOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    await this.addPoints(order.userId, order.totalPrice);

    await this.orderRepository.cancelOrder(orderId);
  }

  async getBoughtBooks(userId: number, page: number, pageSize: number): Promise<Order[]> {
    return this.orderRepository.getBoughtBooks(userId, page, pageSize);
  }

  private async getUserById(userId: number): Promise<User | undefined> {
    return this.userService.getUserById(userId);
  }

  private async deductPoints(userId: number, points: number): Promise<void> {
    await this.userService.deductPoints(userId, points);
  }

  private async getOrderById(orderId: number): Promise<Order | undefined> {
    return this.orderRepository.getOrderById(orderId);
  }

  private async addPoints(userId: number, points: number): Promise<void> {
    await this.userService.addPoints(userId, points);
  }
}
