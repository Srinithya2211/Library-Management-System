const express = require("express");
const router = express.Router();

const db = require("../config/firebase");
const { formatBook } = require("../utils/bookUtils");

// POST - Add a new book
router.post("/", async (req, res) => {
    try {
        const { id, name, author, price } = req.body;

        await db.ref("books/" + id).set({
            name: name,
            author: author,
            price: price
        });

        res.send("Book added successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET - Get all books
router.get("/", async (req, res) => {
    try {
        const snapshot = await db.ref("books").once("value");

        if (!snapshot.exists()) {
            return res.json({});
        }

        res.json(snapshot.val());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET - Get a book by ID
router.get("/:id", async (req, res) => {
    try {
        const snapshot = await db.ref("books/" + req.params.id).once("value");

        if (!snapshot.exists()) {
            return res.status(404).send("Book not found");
        }

        const book = snapshot.val();

        res.json(
            formatBook({
                id: req.params.id,
                ...book
            })
        );
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// PUT - Update a book
router.put("/:id", async (req, res) => {
    try {
        const { name, author, price } = req.body;

        await db.ref("books/" + req.params.id).update({
            name: name,
            author: author,
            price: price
        });

        res.send("Book updated successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// DELETE - Delete a book
router.delete("/:id", async (req, res) => {
    try {
        await db.ref("books/" + req.params.id).remove();

        res.send("Book deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;