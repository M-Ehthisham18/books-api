import express from "express";
import {
  handleGetAllBooks,
  handleAddBooks,
  handleUpdateBooks,
  handleDeleteBooks,
} from "../controllers/handleBooks.controller.js";

const route = express.Router();

// get all books
route.get("/", handleGetAllBooks);

//.POST /books to add a new book from request body
route.post("/add", handleAddBooks);

//PUT /books/:id to update a book by ID.
route.put("/update/:id", handleUpdateBooks);

//DELETE /books/:id to remove a book.
route.delete("/delete/:id", handleDeleteBooks);

export default route;
