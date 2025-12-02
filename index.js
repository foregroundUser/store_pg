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

//Products API

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
            success: false, message: error.message
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

app.delete('/products/:id', async (req, res) => {
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

app.put('/products/:id', async (req, res) => {
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

app.get('/products/:id', async (req, res) => {
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


//Category API s
//[GET] /categories barcha categorylarni olish
//[GET] /categories/:id
// [POST] /categories/ create category
// [PUT] / categories/:id update category
// [DELETE]/categories/:id delete categories

app.get('/categories', async (req, res) => {
    try {
        const result = await pool.query('select * from categories');
        if (!result.rows) {
            res.status(404).json({
                status: false, message: "Categories empty"
            });
        } else {
            res.status(200).json(result.rows);
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/categories/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query('select * from categories where id=$1', [id]);
        if (result.rows.length === 1) {
            res.status(200).json(result.rows[0])
        } else {
            res.status(404).json({
                status: false, message: "Id not found"
            });
        }
    } catch (error) {
        console.log(error.message)
    }
});

app.post('/categories', async (req, res) => {
    try {
        const {name, image} = req.body;
        if (!name || !image) {
            res.status(500).json({
                message: "Please fill all required fields", status: false
            })
        } else {
            const result = await pool.query('insert into categories(name,image)  values($1,$2) returning * ', [name, image])
            res.status(200).json(result.rows);
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.delete('/categories/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const query = await pool.query('delete from categories where id =$1 returning *', [id])
        if (query.rows.length !== 0) {
            res.status(200).json(query.rows)
        } else {
            res.status(404).json({status: false, message: "Id not found"});
        }
    } catch (e) {
        console.log(e.message)
    }
});

app.put('/categories/:id', async (req, res) => {
    try {
        const {name, image} = req.body;
        const {id} = req.params
        if (!name || !image) {
            res.status(500).json({
                message: "Please fill all required fields", status: false
            })
        } else {
            const result = await pool.query('update categories set name=$1,  image=$2 where id=$3 returning * ', [name, image, id])
            if (result.rows.length !== 0) {
                res.status(200).json(result.rows)
            } else {
                res.status(404).json({status: false, message: "Id not found"});

            }
        }
    } catch (e) {
        console.log(e.message)
    }
});

// Users API
app.post('/users', async (req, res) => {
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

app.get('/users', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
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

app.put('/users/:id', async (req, res) => {
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

app.listen(5000, () => {
    console.log('server is running ');
})