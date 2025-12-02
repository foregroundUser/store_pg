const pool = require("../db.js");
const express = require('express');
const userRouter = express.Router();
userRouter.post('/', async (req, res) => {
    try {
        const {name, email, password, avatar, role} = req.body;
        const result = await pool.query('insert into users(name, email, password,avatar,role) values ($1, $2, $3,$4,$5) returning *', [name, email, password, avatar, role]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        })
        console.log(error)
    }
})

userRouter.get('/', async (req, res) => {
    try {
        const result = await pool.query('select * from users');
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

userRouter.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query('delete from users where id=$1', [id]);
        res.status(200).json({
            success: true, data: result.rows
        });

    } catch (error) {
        res.status(200).json({
            success: false, message: error.message
        });
    }
})

userRouter.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {name, email, password, avatar} = req.body;
    if (!name || !email || !password) {

        if (!name) {
            res.status(200).json({
                success: false, message: 'name is required'
            });
        }
        if (!email) {
            res.status(200).json({
                success: false, message: 'email is required'
            });
        }
        if (!password) {
            res.status(200).json({
                success: false, message: 'password is required'
            });
        }

        res.status(200).json({
            success: false, message: 'All fields are required'
        });
    }
    const result = await pool.query('update users set name=$1, email=$2, password=$3, role=$5 where id=$4', [name, email, password, id, avatar]);
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

module.exports = userRouter