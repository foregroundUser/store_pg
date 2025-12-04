const {query} = require("../db");
exports.getAllElements = (tableName) => {
    return async (req, res) => {
        try {
            const result = await query(`select *
                                        from ${tableName}`);
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
    }
}