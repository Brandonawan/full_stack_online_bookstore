"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
let orders = [];
class OrderRepository {
    createOrder(order) {
        order.id = orders.length + 1;
        orders.push(order);
        return order;
    }
    cancelOrder(orderId) {
        orders = orders.filter((order) => order.id !== orderId);
    }
    getOrderById(orderId) {
        return orders.find((order) => order.id === orderId);
    }
    getBoughtBooks(userId, page, pageSize) {
        const userOrders = orders.filter((order) => order.userId === userId);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return userOrders.slice(startIndex, endIndex);
    }
}
exports.OrderRepository = OrderRepository;
