// src/controller/UserController.ts
import express, { Request, Response } from "express";
import { UserService } from "../service/UserService";

const router = express.Router();
const userService = new UserService();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    console.log("user", user);
    res.status(201).json({ message: "Registration successful", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userService.loginUser(username, password);
    res.status(200).json({ message: "Login successful", user });
    console.log("user", user);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
