const jwt = require("jsonwebtoken");

const SECRET_KEY = "library_secret_key";

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send("Access token required");
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send("Invalid or expired token");
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;