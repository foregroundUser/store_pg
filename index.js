const express = require('express');
const app = express();
const {Pool} = require('pg');
const pool = new Pool({host: 'localhost', database: 'pgLearn', user: 'postgres', password: '2255', port: 5432});
pool.connect().then(() => {
    console.log('connected');
}).catch((err) => {
    console.log(err);
});
app.use(express.json());


app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('select * from products');
        const isHave = result.rows.length > 0;
        if (isHave) {
            res.status(200).json({
                success: true,
                data: result.rows
            });
        } else {
            res.status(200).json({
                success: false,
                message: 'no data found'
            });
        }

    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        });
    }
})

app.get('/products/:id', async (req, res) => {
    const id = req.params;
    const result = await poo.query('select * from products where id=$1', [id]);
    const data = result.rows.length === 1;
    if (data) {
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'no data found'
        });
    }
})