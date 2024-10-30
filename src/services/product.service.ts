import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
  async createProduct(title: string, description: string, image: string) {
    return await prisma.product.create({
      data: { title, description, image },
    });
  }

  async getAllProducts() {
    return await prisma.product.findMany();
  }

  async updateProduct(
    id: number,
    data: { title: string; description: string; image: string }
  ) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: number) {
    return await prisma.product.delete({ where: { id } });
  }
}
