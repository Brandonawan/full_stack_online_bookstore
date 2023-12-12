// src/repository/OrderRepository.ts
import { Order } from "../entity/Order";

let orders: Order[] = [];

export class OrderRepository {
  createOrder(order: Order): Order {
    order.id = orders.length + 1;
    orders.push(order);
    return order;
  }

  cancelOrder(orderId: number): void {
    orders = orders.filter((order) => order.id !== orderId);
  }

  getOrderById(orderId: number): Order | undefined {
    return orders.find((order) => order.id === orderId);
  }

  getBoughtBooks(userId: number, page: number, pageSize: number): Order[] {
    const userOrders = orders.filter((order) => order.userId === userId);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return userOrders.slice(startIndex, endIndex);
  }
}
