const pool = require("../db");
const {getAllProducts} = require("./productController");
exports.getCategories = getAllProducts('categories');

exports.getCategoryById = async (req, res) => {
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
}

exports.addCategory = async (req, res) => {
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
}

exports.deleteCategory = async (req, res) => {
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
}

exports.updateCategory = async (req, res) => {
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
}