import express from "express";
import { v4 as uuidv4 } from "uuid";
import pool from "./db.js"; // Relative path, since both are in the same directory

const app = express();
app.use(express.json());

const port = 3000;

// GET /books -> return all books
app.get("/books", async (req, res) => {
  try {
    const books = await pool.query("SELECT * FROM book;");
    res
      .status(200)
      .json({ message: `All books are returned `, data: books.rows });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// GET /books/:id -> return a specific book
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query("SELECT * FROM book WHERE id=$1", [id]);

    res
      .status(200)
      .json({ message: "return a specific book with", data: book.rows });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// POST /books -> create a book
app.post("/books", async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();
    console.log(id);

    //inserting book data into database
    const result = await pool.query(
      "INSERT INTO book (id, name, description) VALUES ($1, $2, $3) RETURNING *",
      [id, name, description]
    );

    console.log(result);

    res.status(201).json({
      message: `books is created `,
      data: result.rows[0],
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// DELETE /books/:id -> delete a specific book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await pool.query("DELETE FROM book WHERE id=$1;", [id]);

    res.status(200).json({ message: "book is deleted " });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// PUT /books -> update a book

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedBook = await pool.query(
      "UPDATE book SET name=$1, description=$2 WHERE id=$3 RETURNING *",
      [name, description, id]
    );

    console.log(updatedBook.rows);

    res
      .status(200)
      .json({ message: `books is updated `, data: updatedBook.rows });
  } catch (error) {
    console.log("im here");
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
