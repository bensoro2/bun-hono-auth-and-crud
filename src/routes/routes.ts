import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";
import { ProductController } from "../controllers/product.controller";
import { jwt } from "hono/jwt";

// สร้างอินสแตนซ์ของ Hono
const router = new Hono();
const authController = new AuthController();
const productController = new ProductController();

// ใช้ JWT_SECRET จาก .env
const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

// Middleware สำหรับปกป้อง route ด้วย JWT
const authMiddleware = jwt({ secret: JWT_SECRET });

// Routes สำหรับ Authentication
router.post("/register", (c) => authController.register(c));
router.post("/login", (c) => authController.login(c));

// Routes สำหรับ Product (ต้องผ่าน JWT Authentication)
router.post("/products", authMiddleware, (c) => productController.create(c));
router.get("/products", (c) => productController.getAll(c));
router.put("/products/:id", authMiddleware, (c) => productController.update(c));
router.delete("/products/:id", authMiddleware, (c) =>
  productController.delete(c)
);

export default router;
