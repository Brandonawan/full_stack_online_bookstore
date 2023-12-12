// src/controller/OrderController.ts
import express, { Request, Response } from "express";
import { OrderService } from "../service/OrderService";

const router = express.Router();
const orderService = new OrderService();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { userId, bookId, quantity, totalPrice } = req.body;
    const order = await orderService.createOrder(userId, bookId, quantity, totalPrice);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Implement other endpoints if needed

export default router;
