const router = require("express").Router();
const Book = require("../database/Book");
const User = require("../database/User");
const { authPage } = require("../middleware/middleware");

router.get("/books/all", authPage(["Admin"]), async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(404).json("Error in getting books from database");
  }
});
router.get("/books/", async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    const favioriteBooks = user?.favourites || [];
    const preferedGeneres = user?.preferences?.genres || [];

    let books;
    if (favioriteBooks.length > 0) {
      books = await Book.find({ _id: { $in: favioriteBooks } });
    } else if (preferedGeneres.length > 0) {
      books = await Book.find({ genre: { $in: preferedGeneres } });
    } else {
      books = await Book.find();
    }
    if (!books || books.length === 0) {
      return res.status(404).json("No books available");
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(404).send("Error in getting books from database", error.message);
  }
});

router.post("/books", authPage(["Student"]), async (req, res) => {
  const { title, author, isbn, publishedYear, genre } = req.body;
  try {
    if (!title || !author || !isbn || !publishedYear)
      return res.status(400).json("All fields are required");

    const newBook = new Book({
      title,
      author,
      ISBN: isbn,
      publishedYear,
      genre,
    });
    await newBook.save();
    res.status(201).json({ message: "Book added succesfuly;" });
  } catch (error) {}
});

router.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, publishedYear, genre } = req.body;

    if (!title || !author || !isbn || !publishedYear)
      return res.status(400).json("All fields are required");
    const book = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        ISBN: isbn,
        publishedYear,
        genre,
      },
      { new: true }
    );

    if (book) {
      res.status(200).json("book updated succesfully");
    } else {
      return res.status(404).json({ message: "Book is not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating book", error: error.message });
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(404).json({ message: "Book deleted succesfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting book", error: error.message });
  }
});
router.get("/books/recommendations", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length < 0)
      return res.status(404).json({ message: "No books availiable" });
    const random = books[Math.floor(Math.random() * books.length)];
    res.status(200).json({ recommendations: random });
  } catch (error) {
    res
      .status(400)
      .json({ messsage: "Error inffetching recommendation books" });
  }
});

module.exports = router;

// Custom Endpoint with Authentication:
// Add a new feature that leverages authentication. For example:
// /books/recommendations can suggest books based on the logged-in user's preferences or role.
