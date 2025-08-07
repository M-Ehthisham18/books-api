import { readBook, writeBook } from "../utils/bookStorage.js";
import { writeFile } from "fs/promises";
const filePath = new URL("../config/booksArray.json", import.meta.url);

// get all books from file
const handleGetAllBooks = async (req, res) => {
  try {
    const books = await readBook();
    return res.json(books);
  } catch (error) {
    console.log("error in getting all books : ", error.message);
  }
};
// add one or more books to the file.
const handleAddBooks = async (req, res) => {
  try {
    const allBooksToAdd = req.body;

    if (!allBooksToAdd || !Array.isArray(allBooksToAdd)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const addedBooks = [];

    for (const b of allBooksToAdd) {
      const allBooks = await readBook();
      const newBook = {
        id: allBooks.length + 1,
        title: b.title,
        author: b.author,
      };
      await writeBook(newBook);
      addedBooks.push(newBook);
    }

    res.status(201).json({
      message: "Books added successfully",
      books: addedBooks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//PUT /books/:id to update a book by ID.
const handleUpdateBooks = async (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  try {
    const books = await readBook();

    const book = books.find((b) => b.id === parseInt(id));
    console.log(book);

    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;

      await writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");

      return res.status(200).json({ message: "Updated successfully!" }, book);
    } else {
      return res.status(404).json({ message: "Book not found!" });
    }
  } catch (error) {
    console.log("Error in updating book:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//DELETE /books/:id to remove a book.
const handleDeleteBooks = async (req, res) => {
  const { id } = req.params;

  try {
    let books = await readBook();

    const index = books.findIndex((b) => b.id === parseInt(id));
    console.log(index);

    if (index !== -1) {
      books.splice(index, index + 1);
      await writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");
      return res.json({ message: "Book deleted" });
    } else {
      return res.status(404).json({ message: "Book not found!" });
    }
  } catch (error) {
    console.log("Error deleting book:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  handleGetAllBooks,
  handleAddBooks,
  handleUpdateBooks,
  handleDeleteBooks,
};
