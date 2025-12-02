const pool = require("../db");
const express = require('express');
const productRouter = express.Router();
productRouter.post('/', async (req, res) => {
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
            success: false, message: error.message
        })
        console.log(error)
    }
})
productRouter.get('/', async (req, res) => {
    try {
        const result = await pool.query('select * from products');
        const isHave = result.rows.length > 0;
        if (isHave) {
            res.status(200).json({
                success: true, data: result.rows
            });
        } else {
            res.status(200).json({
                success: false, message: 'no data found'
            });
        }

    } catch (error) {
        res.status(200).json({
            success: false, message: error.message
        });
    }
})

productRouter.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query('delete from products where id=$1', [id]);
        res.status(200).json({
            success: true, data: result.rows
        });

    } catch (error) {
        res.status(200).json({
            success: false, message: error.message
        });
    }
})

productRouter.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {title, price, description, image, categoryId} = req.body;
    const result = await pool.query('update products set title=$1, price=$2, description=$3, image=$4, categoryId=$5 where id=$6', [title, price, description, image, categoryId, id]);
    if (!title || !price || !description || !image || !categoryId) {

        if (!title) {
            res.status(200).json({
                success: false, message: 'title is required'
            });
        }
        if (!price) {
            res.status(200).json({
                success: false, message: 'price is required'
            });
        }
        if (!description) {
            res.status(200).json({
                success: false, message: 'description is required'
            });
        }
        if (!image) {
            res.status(200).json({
                success: false, message: 'image is required'
            });
        }
        if (!categoryId) {
            res.status(200).json({
                success: false, message: 'categoryId is required'
            });
        }

        res.status(200).json({
            success: false, message: 'All fields are required'
        });
    }
    if (result.rows.length === 1) {
        res.status(200).json({
            success: true, data: result.rows
        });
    } else {
        res.status(200).json({
            success: false, message: 'Invalid id'
        });
    }
});

productRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    const result = await pool.query('select * from products where id=$1', [id]);
    const data = result.rows.length === 1;
    if (data) {
        res.status(200).json({
            success: true, data: result.rows
        });
    } else {
        res.status(200).json({
            success: false, message: 'no data found'
        });
    }
});

module.exports = productRouter
