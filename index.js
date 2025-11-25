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

app.post('/products', async (req, res) => {
    try {
        const {title, price, description, image, categoryId} = req.body
        const result = await pool.query(`
            insert into products(title, price, description, image, categoryId)
            values ($1, $2, $3, $4, $5)
            returning *
        `, [title, price, description, image, categoryId])
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error)
    }
})

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

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const {title, image, description, price, categoryId} = req.body;
    const response = await pool.query('update products  set title=$1, image=$2,description=$3,price=$4,categoryId=$5', [title, image, description, price, categoryId])
});

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const result = await pool.query('select * from products where id=$1', [id]);
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

app.listen(5000, () => {
    console.log('server is running ');
})