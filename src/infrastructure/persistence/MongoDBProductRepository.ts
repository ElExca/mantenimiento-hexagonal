import { Product } from "../../domain/Product";
import { ProductRepositoryPort } from "../../application/ports/ProductRepositoryPort";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const ProductModel = mongoose.model('Product', ProductSchema);

export class MongoDBProductRepository implements ProductRepositoryPort {
  async getAllProducts(): Promise<Product[]> {
    const products = await ProductModel.find();
    return products.map(product => new Product(
      product.id || 'defaultId',
      product.name || 'defaultName',
      product.price || 0
    ));
  }

  async getProductById(id: string): Promise<Product> {
    const product = await ProductModel.findById(id);
    if (!product) throw new Error('Product not found');
    return new Product(
      product.id || 'defaultId',
      product.name || 'defaultName',
      product.price || 0
    );
  }

  async createProduct(productData: Product): Promise<Product> {
    const createdProduct = await ProductModel.create({ 
      name: productData.name, 
      price: productData.price 
    });
    return new Product(
      createdProduct.id || 'defaultId',
      createdProduct.name || 'defaultName',
      createdProduct.price || 0
    );
  }

  async updateProduct(id: string, productData: Product): Promise<Product> {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, 
      { 
        name: productData.name, 
        price: productData.price 
      }, 
      { new: true }
    );
    if (!updatedProduct) throw new Error('Product not found');
    return new Product(
      updatedProduct.id || 'defaultId',
      updatedProduct.name || 'defaultName',
      updatedProduct.price || 0
    );
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return result != null;
  }
}
