const jwt = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header yo'q!" });
        }

        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({ message: "Token formati noto'g'ri. Bearer <token> bo'lishi kerak." });
        }
        console.log(jwt.verify(token, "ketmonchi"));
        req.user = jwt.verify(token, "ketmonchi");
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token noto'g'ri yoki eskirgan!", error: err.message });
    }
};
