"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const ProductController_1 = require("../infrastructure/api/ProductController");
const MongoDBProductRepository_1 = require("../infrastructure/persistence/MongoDBProductRepository");
const ProductService_1 = require("../application/services/ProductService");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 5000;
mongoose_1.default.connect("mongodb://127.0.0.1:27017/productosDB")
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
// Middleware para parsear el cuerpo de las solicitudes
app.use(body_parser_1.default.json());
// Inicialización de ProductController con las dependencias necesarias
const productRepository = new MongoDBProductRepository_1.MongoDBProductRepository();
const productService = new ProductService_1.ProductService(productRepository);
const productController = new ProductController_1.ProductController(productService);
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
