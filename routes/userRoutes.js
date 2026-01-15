const express = require('express');
const {
    getAllUsers,
    deleteUser,
    updateUser,
    registerUser,
    loginUser,
    getUserById
} = require("../controllers/userController");
const {authentication} = require("../middlewares/authentication");
const {roleCheck} = require("../middlewares/rolecheck.middleware");
const userRouter = express.Router();
userRouter.post('/', registerUser)
userRouter.post("/login", loginUser)

userRouter.get('/', authentication, roleCheck('admin'), getAllUsers)
userRouter.delete('/:id', authentication, roleCheck('admin'), deleteUser)
userRouter.get('/:id', authentication, roleCheck('admin'), getUserById)
userRouter.put('/:id', authentication, roleCheck('admin'), updateUser);


module.exports = userRouter
