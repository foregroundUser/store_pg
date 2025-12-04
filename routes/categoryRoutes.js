const express = require('express');
const {
    getCategories,
    getCategoryById,
    addCategory,
    deleteCategory,
    updateCategory
} = require("../controllers/categoryController");
const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);

categoryRouter.get('/:id', getCategoryById);

categoryRouter.post('/', addCategory);

categoryRouter.delete('/:id', deleteCategory);

categoryRouter.put('/:id', updateCategory);

module.exports = categoryRouter