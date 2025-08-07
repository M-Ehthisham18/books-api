import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
const filePath = new URL("../config/booksArray.json", import.meta.url);

// Read books from file
const readBook = async () => {
  if (!existsSync(filePath.pathname)) {
    await writeFile(filePath, "[]", "utf-8");
    array;
  }

  const data = await readFile(filePath, "utf-8");

  if (data.trim() === "") {
    return [];
  }

  return JSON.parse(data);
};

const writeBook = async (book) => {
  const books = await readBook();

  books.push(book);

  await writeFile(filePath, JSON.stringify(books, null, 2), "utf-8"); // save full array
  return true;
};

export { readBook, writeBook };
