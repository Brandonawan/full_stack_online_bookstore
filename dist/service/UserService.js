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
exports.UserService = void 0;
const UserRepository_1 = require("../repository/UserRepository");
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    createUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the username is already taken
            const existingUser = yield this.userRepository.getUserByUsername(username);
            if (existingUser) {
                throw new Error("Username is already taken");
            }
            // Save plain password to the database (for now)
            const user = {
                id: 0, // The database will generate the ID
                username,
                password,
                points: 100, // Initial points for a new user
            };
            return this.userRepository.createUser(user);
        });
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve user from the database
            const user = yield this.userRepository.getUserByUsername(username);
            if (!user || user.password !== password) {
                throw new Error("Invalid username or password");
            }
            return user;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUserById(userId);
        });
    }
    deductPoints(userId, points) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.deductPoints(userId, points);
        });
    }
    addPoints(userId, points) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.addPoints(userId, points);
        });
    }
}
exports.UserService = UserService;
