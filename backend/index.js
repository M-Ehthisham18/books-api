import express from "express";
import dotenv from 'dotenv';
// impor routes
import booksRoute from "./src/routes/books.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middelwares
app.use(express.json());

//routes
app.get("/", (req,res) => {
  res.send("server is live ...");
});
// all the books are handlede by books.route.js
app.use("/books", booksRoute);

app.listen(port, () => console.log(`server is running on http://localhost:${port}`)
)