import { Hono } from "hono";
import { AuthController } from "./controllers/auth.controller";
import { ProductController } from "./controllers/product.controller";
import { jwt } from "hono/jwt";
import { config } from "dotenv";

// โหลดค่าใน .env
config();

const app = new Hono();
const authController = new AuthController();
const productController = new ProductController();

// ใช้ JWT_SECRET จาก .env
const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

// Middleware สำหรับปกป้อง route ด้วย JWT
const authMiddleware = jwt({ secret: JWT_SECRET });

// Routes สำหรับ Authentication
app.post("/register", (c) => authController.register(c));
app.post("/login", (c) => authController.login(c));

// Routes สำหรับ Product (ต้องผ่าน JWT Authentication)
app.post("/products", authMiddleware, (c) => productController.create(c));
app.get("/products", (c) => productController.getAll(c));
app.put("/products/:id", authMiddleware, (c) => productController.update(c));
app.delete("/products/:id", authMiddleware, (c) => productController.delete(c));

export default app;
