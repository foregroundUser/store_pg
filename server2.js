const express = require("express");
const app = express();
app.use(express.json());

app.listen(5001, () => {
    console.log("GIRGITTON 5001-portda ishlayapti...");
});

app.use((req, res, next) => {
    const age = req.query.age;
    if (!age) return res.status(401).json({message: "Where age ?"});
    if (age < 20) return res.status(403).json({message: "You are looking like a kid"});
    next();
})

app.get("/quote", (req, res) => {
    res.json({
        "author": "Anonymous", "quote": "Sometimes you'll never know the value of a moment, until it becomes a memory.",

    });
});
