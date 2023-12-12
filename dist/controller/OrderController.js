"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/controller/OrderController.ts
const express_1 = __importDefault(require("express"));
const OrderService_1 = require("../service/OrderService");
const router = express_1.default.Router();
const orderService = new OrderService_1.OrderService();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, bookId, quantity, totalPrice } = req.body;
        const order = yield orderService.createOrder(userId, bookId, quantity, totalPrice);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Implement other endpoints if needed
exports.default = router;
