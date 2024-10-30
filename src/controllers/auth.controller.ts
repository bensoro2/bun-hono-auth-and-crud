import { Context } from "hono";
import { AuthService } from "../services/auth.service";
import * as jwt from "jsonwebtoken";

const authService = new AuthService();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export class AuthController {
  async register(c: Context) {
    const { username, password } = await c.req.json();
    try {
      const user = await authService.register(username, password);
      return c.json({ message: "User registered successfully", user });
    } catch (error) {
      return c.json({ error: "Username already exists" }, 400);
    }
  }

  async login(c: Context) {
    const { username, password } = await c.req.json();
    try {
      const user = await authService.login(username, password);
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return c.json({ token });
    } catch (error) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
  }
}
