const express = require("express");
const app = express();

exports.authentication = app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (token !== "Bearer xyz")
        next();
})
