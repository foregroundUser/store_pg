const express = require('express');
const {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById
} = require("../controllers/productController");
const productRouter = express.Router();

productRouter.post('/', addProduct)
productRouter.get('/', getAllProducts)
productRouter.delete('/:id', deleteProduct)
productRouter.put('/:id', updateProduct);

productRouter.get('/:id', getProductById);

module.exports = productRouter
