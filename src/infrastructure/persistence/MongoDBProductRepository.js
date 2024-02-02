"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBProductRepository = void 0;
const Product_1 = require("../../domain/Product");
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: String,
    price: Number,
});
const ProductModel = mongoose_1.default.model('Product', ProductSchema);
class MongoDBProductRepository {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductModel.find();
            return products.map(product => new Product_1.Product(product.id || 'defaultId', product.name || 'defaultName', product.price || 0));
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductModel.findById(id);
            if (!product)
                throw new Error('Product not found');
            return new Product_1.Product(product.id || 'defaultId', product.name || 'defaultName', product.price || 0);
        });
    }
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdProduct = yield ProductModel.create({
                name: productData.name,
                price: productData.price
            });
            return new Product_1.Product(createdProduct.id || 'defaultId', createdProduct.name || 'defaultName', createdProduct.price || 0);
        });
    }
    updateProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield ProductModel.findByIdAndUpdate(id, {
                name: productData.name,
                price: productData.price
            }, { new: true });
            if (!updatedProduct)
                throw new Error('Product not found');
            return new Product_1.Product(updatedProduct.id || 'defaultId', updatedProduct.name || 'defaultName', updatedProduct.price || 0);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductModel.findByIdAndDelete(id);
            return result != null;
        });
    }
}
exports.MongoDBProductRepository = MongoDBProductRepository;
