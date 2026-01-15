const pool = require("../db");
exports.getAllElements = (tableName) => {
    return async (req, res) => {
        try {
            const result = await pool.query(`SELECT * FROM ${tableName}`);
            return res.status(200).json(result.rows);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }
    };
};
