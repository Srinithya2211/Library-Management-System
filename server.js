const express = require("express");

const app = express();

app.use(express.json());

const bookRoutes = require("./routes/books");
const authRoutes = require("./routes/auth");
const authenticateToken = require("./routes/authMiddleware");

app.get("/", (req, res) => {
    res.send("Library Management System");
});

app.use("/auth", authRoutes);

// JWT protected book routes
app.use("/books", authenticateToken, bookRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});