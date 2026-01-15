const express = require('express');
const {
    getCategories, getCategoryById, addCategory, deleteCategory, updateCategory
} = require("../controllers/categoryController");
const {authentication} = require("../middlewares/authentication");
const {roleCheck} = require("../middlewares/rolecheck.middleware");
const categoryRouter = express.Router();
categoryRouter.use(authentication)
categoryRouter.use(roleCheck('admin','customer'))


//End-Points
categoryRouter.get('/', getCategories);

categoryRouter.get('/:id', getCategoryById);

categoryRouter.post('/', addCategory);

categoryRouter.delete('/:id', deleteCategory);

categoryRouter.put('/:id', updateCategory);

module.exports = categoryRouter
