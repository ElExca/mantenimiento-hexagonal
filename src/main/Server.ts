import express from 'express';
import mongoose from 'mongoose';
import { ProductController } from '../infrastructure/api/ProductController';
import { MongoDBProductRepository } from '../infrastructure/persistence/MongoDBProductRepository';
import { ProductService } from '../application/services/ProductService';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;


mongoose.connect("mongodb://127.0.0.1:27017/productosDB")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

const productRepository = new MongoDBProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Definición de rutas
app.get('/api/products', (req, res) => productController.getAllProducts(req, res));
app.get('/api/products/:id', (req, res) => productController.getProductById(req, res));
app.post('/api/products', (req, res) => productController.createProduct(req, res));
app.put('/api/products/:id', (req, res) => productController.updateProduct(req, res));
app.delete('/api/products/:id', (req, res) => productController.deleteProduct(req, res));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
