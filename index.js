const express = require('express');
const app = express();
app.use(express.json());
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");

app.use('/products', productRouter)

app.use('/categories', categoryRouter)

app.use('/users', userRouter)

app.listen(5000, () => {
    console.log('server is running ');
})