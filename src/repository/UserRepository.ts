// src/repository/UserRepository.ts

import { User } from "../entity/User";
import pool from "../config/db";

export class UserRepository {
  async createUser(user: User): Promise<User> {
    try {
      const query = "INSERT INTO users (username, password, points) VALUES ($1, $2, $3) RETURNING *";
      const result = await pool.query(query, [user.username, user.password, user.points]);

      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const query = "SELECT * FROM users WHERE username = $1";
      const result = await pool.query(query, [username]);

      return result.rows[0];
    } catch (error) {
      console.error("Error retrieving user:", error);
      throw new Error("Error retrieving user");
    }
  }

  async getUserById(userId: number): Promise<User | undefined> {
    try {
      const query = "SELECT * FROM users WHERE id = $1";
      const result = await pool.query(query, [userId]);

      return result.rows[0];
    } catch (error) {
      console.error("Error retrieving user by ID:", error);
      throw new Error("Error retrieving user by ID");
    }
  }

  async deductPoints(userId: number, points: number): Promise<void> {
    try {
      // Convert points to integer
      const pointsToDeduct = Math.floor(points);
      const query = "UPDATE users SET points = points - $2 WHERE id = $1";
      await pool.query(query, [userId, pointsToDeduct]);
    } catch (error) {
      console.error("Error deducting points:", error);
      throw new Error("Error deducting points");
    }
  }
  
  async addPoints(userId: number, points: number): Promise<void> {
    try {
      // Convert points to integer
      const pointsToAdd = Math.floor(points);
      const query = "UPDATE users SET points = points + $2 WHERE id = $1";
      await pool.query(query, [userId, pointsToAdd]);
    } catch (error) {
      console.error("Error adding points:", error);
      throw new Error("Error adding points");
    }
  }  
}
