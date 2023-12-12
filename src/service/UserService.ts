// src/service/UserService.ts
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(username: string, password: string): Promise<User> {
    // Check if the username is already taken
    const existingUser = await this.userRepository.getUserByUsername(username);

    if (existingUser) {
      throw new Error("Username is already taken");
    }

    // Save plain password to the database (for now)
    const user: User = {
      id: 0, // The database will generate the ID
      username,
      password,
      points: 100, // Initial points for a new user
    };

    return this.userRepository.createUser(user);
  }

  async loginUser(username: string, password: string): Promise<User> {
    // Retrieve user from the database
    const user = await this.userRepository.getUserByUsername(username);

    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }

    return user;
  }

  async getUserById(userId: number): Promise<User | undefined> {
      return this.userRepository.getUserById(userId);
    }

    async deductPoints(userId: number, points: number): Promise<void> {
      await this.userRepository.deductPoints(userId, points);
    }

    async addPoints(userId: number, points: number): Promise<void> {
      await this.userRepository.addPoints(userId, points);
    }
}
