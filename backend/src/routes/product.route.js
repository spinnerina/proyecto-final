import ProductController from "../controllers/product.controller.js";
import { Router } from 'express';
import Middleware from '../middleware/middleware.js';

const productRouter = Router();
const middleware = new Middleware();

productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/stats', middleware.validateToken, ProductController.getProductStats);
productRouter.post('/filter', ProductController.getProductByFilter);
productRouter.get('/categories', ProductController.getCategory);
productRouter.get('/:id', middleware.validateToken, ProductController.getProductById);
productRouter.post('/', middleware.validateToken, ProductController.createProduct);
productRouter.put('/:id', middleware.validateToken, ProductController.updateProduct);
productRouter.delete('/:id', middleware.validateToken, ProductController.deleteProduct);

export { productRouter };