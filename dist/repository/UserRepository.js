"use strict";
// src/repository/UserRepository.ts
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
exports.UserRepository = void 0;
const db_1 = __importDefault(require("../config/db"));
class UserRepository {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "INSERT INTO users (username, password, points) VALUES ($1, $2, $3) RETURNING *";
                const result = yield db_1.default.query(query, [user.username, user.password, user.points]);
                return result.rows[0];
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw new Error("Error creating user");
            }
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM users WHERE username = $1";
                const result = yield db_1.default.query(query, [username]);
                return result.rows[0];
            }
            catch (error) {
                console.error("Error retrieving user:", error);
                throw new Error("Error retrieving user");
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM users WHERE id = $1";
                const result = yield db_1.default.query(query, [userId]);
                return result.rows[0];
            }
            catch (error) {
                console.error("Error retrieving user by ID:", error);
                throw new Error("Error retrieving user by ID");
            }
        });
    }
    deductPoints(userId, points) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "UPDATE users SET points = points - $2 WHERE id = $1";
                yield db_1.default.query(query, [userId, points]);
            }
            catch (error) {
                console.error("Error deducting points:", error);
                throw new Error("Error deducting points");
            }
        });
    }
    addPoints(userId, points) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "UPDATE users SET points = points + $2 WHERE id = $1";
                yield db_1.default.query(query, [userId, points]);
            }
            catch (error) {
                console.error("Error adding points:", error);
                throw new Error("Error adding points");
            }
        });
    }
}
exports.UserRepository = UserRepository;
