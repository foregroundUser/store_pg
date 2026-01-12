const express = require("express");
const app = express();
app.use(express.json());

app.listen(5001, () => {
    console.log("GIRGITTON 5001-portda ishlayapti...");
});


/*
app.get("/quote", (req, res) => {
    res.json({
        "author": "Anonymous", "quote": "Sometimes you'll never know the value of a moment, until it becomes a memory.",

    });
});
*/

app.get("/login", (req, res) => {
    res.json({message: "You are logged in successfully"});
});
