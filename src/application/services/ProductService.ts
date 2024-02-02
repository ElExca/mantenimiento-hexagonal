import { Product } from "../../domain/Product";
import { ProductRepositoryPort } from "../ports/ProductRepositoryPort";

export class ProductService {
  constructor(private productRepository: ProductRepositoryPort) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  async getProductById(id: string): Promise<Product> {
    return this.productRepository.getProductById(id);
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.createProduct(product);
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    return this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.productRepository.deleteProduct(id);
  }
}
