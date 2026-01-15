const pool = require("../db");
const {getAllElements} = require("./commonController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.getAllUsers = getAllElements('users')
exports.registerUser = async (req, res) => {
    try {
        const {name, email, password, avatar, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                success: false, message: 'Email already exists'
            });

        }
        const result = await pool.query('insert into users(name, email, password,avatar,role) values ($1, $2, $3,$4,$5) returning *', [name, email, hashedPassword, avatar, role]);
        const token = jwt.sign({id: result.id, role: result.role}, "ketmonchi")
        console.log(token)
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        })
        console.log(error)
    }
}

function checkEmailExists(email) {
    return pool.query('select * from users where email=$1', [email])
        .then(result => result.rows.length > 0);
}


exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await pool.query('select * from users where email=$1', [email]);
        if (result.rows.length === 1) {
            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.status(200).json({
                    success: true, data: user
                });
            } else {
                res.status(401).json({
                    success: false, message: 'Invalid password'
                });
            }
        } else {
            res.status(404).json({
                success: false, message: 'User not found'
            });
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}
exports.deleteUser = async (req, res) => {
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
}
exports.updateUser = async (req, res) => {
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
}
