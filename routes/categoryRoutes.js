const express = require('express');
const {
    getCategories, getCategoryById, addCategory, deleteCategory, updateCategory
} = require("../controllers/categoryController");
const {authentication} = require("../middlewares/authentication");
const categoryRouter = express.Router();

// Authenticaion
categoryRouter.use(authentication)


//End-Points
categoryRouter.get('/', getCategories);

categoryRouter.get('/:id', getCategoryById);

categoryRouter.post('/', addCategory);

categoryRouter.delete('/:id', deleteCategory);

categoryRouter.put('/:id', updateCategory);

module.exports = categoryRouter
