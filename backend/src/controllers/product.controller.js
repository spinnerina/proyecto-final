import { Product } from '../model/product.model.js';
import { productSchemaValidator, updateProductSchemaValidator } from '../validators/product.validator.js';

export default class ProductController {

    static async createProduct(req, res) {
        try {
        const product = new Product(req.body);
        const validate = productSchemaValidator.safeParse(product);

        if (!validate.success) {
            return res.status(400).send(validate.error.errors);
        }

        const result = new Product(product);
        await result.save();
        res.status(201).json(result)
        } catch (error) {
            res.status(500).json({ error: "Error to save product" });
        }
    }
    
    static async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Error to get products" });
        }
    }
    
    static async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: "Error to get product" });
        }
    }
    
    static async updateProduct(req, res) {
        try {

            const productUpdate = req.body;
            const validate = updateProductSchemaValidator.safeParse(productUpdate);
            if (!validate.success) {
                return res.status(400).json({ error: "bad request" });
            }
            const id = req.params.id;
            const status = req.body.status;

            const updateProduct = await Product.findByIdAndUpdate(id, { status}, { new: true });

            if (!updateProduct) {
                return res.status(404).json({ error: "Product not found" });
            }

            res.status(200).json(updateProduct);
        } catch (error) {
            res.status(500).json({ error: "Error to update product" });
        }
    }
    
    static async deleteProduct(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: "Error to delete product" });
        }
    }

    static async getProductStats(req, res) {
        try {
            const stats = await Product.aggregate([
                {
                    $match: { status: true }
                },
                {
                    $group: {
                        _id: "$category",
                        averagePrice: { $avg: "$price" },
                        productCount: { $sum: 1 },
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: "$_id",
                        averagePrice: { $round: ["$averagePrice", 2] },
                        productCount: 1
                    }
                }
            ]);
            res.status(200).json(stats);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to get product statistics" });
        }
    }

    static async getProductByFilter(req, res) {
        try {
            const { category, minPrice, maxPrice } = req.body;
            const filter = {};

            if (category) filter.category = category;
            if (minPrice !== undefined) filter.price = { ...filter.price, $gte: minPrice };
            if (maxPrice !== undefined) filter.price = { ...filter.price, $lte: maxPrice };

            const products = await Product.find(filter);
            if(products.length === 0) {
                return res.status(404).json({ error: "Products not found" });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Error to get products by filter" });
        }
    }
}