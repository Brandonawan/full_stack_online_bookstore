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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const OrderRepository_1 = require("../repository/OrderRepository");
const UserService_1 = require("./UserService");
const BookService_1 = require("./BookService");
class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository_1.OrderRepository();
        this.userService = new UserService_1.UserService(); // Create an instance of UserService
        this.bookService = new BookService_1.BookService();
    }
    createOrder(userId, bookId, quantity, totalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            const book = yield this.bookService.getBookById(bookId);
            if (!book) {
                throw new Error("Book not found");
            }
            const orderTotalPrice = book.price * quantity;
            if (user.points < orderTotalPrice) {
                throw new Error("Insufficient points");
            }
            yield this.userService.deductPoints(userId, orderTotalPrice);
            const order = {
                id: 0,
                userId,
                bookId,
                quantity,
                totalPrice: orderTotalPrice, // Use the calculated orderTotalPrice here
                createdAt: new Date(),
            };
            return this.orderRepository.createOrder(order);
        });
    }
    cancelOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.getOrderById(orderId);
            if (!order) {
                throw new Error("Order not found");
            }
            yield this.addPoints(order.userId, order.totalPrice);
            yield this.orderRepository.cancelOrder(orderId);
        });
    }
    getBoughtBooks(userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.getBoughtBooks(userId, page, pageSize);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getUserById(userId);
        });
    }
    deductPoints(userId, points) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.deductPoints(userId, points);
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.getOrderById(orderId);
        });
    }
    addPoints(userId, points) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.addPoints(userId, points);
        });
    }
}
exports.OrderService = OrderService;
