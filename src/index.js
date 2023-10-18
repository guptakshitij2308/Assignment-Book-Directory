const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
];

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    res.json(books[index]);
  } else {
    res.status(404).send("Book not found");
  }
});

app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    const deletedBook = books.splice(index, 1);
    res.json(deletedBook);
  } else {
    res.status(404).send("Book not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
