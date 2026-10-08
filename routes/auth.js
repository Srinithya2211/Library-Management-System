const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const SECRET_KEY = "library_secret_key";

// POST - Login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Demo credentials
    if (username === "admin" && password === "admin123") {
        const token = jwt.sign(
            { username: username },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Login successful",
            token: token
        });
    }

    res.status(401).send("Invalid username or password");
});

module.exports = router;