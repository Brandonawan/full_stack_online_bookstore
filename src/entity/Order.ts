// src/entity/Order.ts

  export interface Order {
    id: number;
    userId: number;
    bookId: number;
    quantity: number;
    totalPrice: number;
    createdAt: Date;
  }