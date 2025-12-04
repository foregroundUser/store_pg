const express = require('express');
const {getAllUsers, deleteUser, updateUser, addUser} = require("../controllers/userController");
const userRouter = express.Router();
userRouter.post('/', addUser)

userRouter.get('/', getAllUsers)

userRouter.delete('/:id', deleteUser)

userRouter.put('/:id', updateUser);

module.exports = userRouter