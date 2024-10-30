import { Context } from "hono";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
  async create(c: Context) {
    const { title, description, image } = await c.req.json();
    const product = await productService.createProduct(
      title,
      description,
      image
    );
    return c.json(product);
  }

  async getAll(c: Context) {
    const products = await productService.getAllProducts();
    return c.json(products);
  }

  async update(c: Context) {
    const id = Number(c.req.param("id"));
    const data = await c.req.json();
    const product = await productService.updateProduct(id, data);
    return c.json(product);
  }

  async delete(c: Context) {
    const id = Number(c.req.param("id"));
    await productService.deleteProduct(id);
    return c.json({ message: "Product deleted successfully" });
  }
}
