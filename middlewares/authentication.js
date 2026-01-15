const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
exports.authentication = app.use((req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(400).json({message: "Token kiritilmadi !"})
    console.log(jwt.verify(token, "ketmonchi"))
})
