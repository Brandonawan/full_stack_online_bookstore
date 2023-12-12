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
// src/controller/UserController.ts
const express_1 = __importDefault(require("express"));
const UserService_1 = require("../service/UserService");
const router = express_1.default.Router();
const userService = new UserService_1.UserService();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userService.createUser(username, password);
        console.log("user", user);
        res.status(201).json({ message: "Registration successful", user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userService.loginUser(username, password);
        res.status(200).json({ message: "Login successful", user });
        console.log("user", user);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
exports.default = router;
