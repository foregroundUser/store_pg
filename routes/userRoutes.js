const express = require('express');
const {getAllUsers, deleteUser, updateUser, registerUser, loginUser} = require("../controllers/userController");
const userRouter = express.Router();
userRouter.post('/', registerUser)
userRouter.get('/', getAllUsers)
userRouter.delete('/:id', deleteUser)

userRouter.put('/:id', updateUser);

userRouter.post("/login", loginUser)

module.exports = userRouter
