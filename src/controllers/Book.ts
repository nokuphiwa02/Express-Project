import { Request, Response } from "express";
import { Books } from "../models";
import { authors } from "../controllers/Author";

export let books: Books[] = [];

//Get All Books
export const getAllBooks = (req: Request, res: Response) => {
  res.status(200).json(books);
};

//Get Books By Id
export const getBooksById = (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === parseInt(id as string));

  if (!book) {
    return res.status(404).send("Book not found");
  }

  res.status(200).json(book);
};

//Create New Book
export const createBook = (req: Request, res: Response) => {
  const { title, authorId, year } = req.body;
  const newBook = { id: books.length + 1, title, authorId, year };

  books.push(newBook);

  res.status(201).json(newBook);
};

//Update Books by Id
export const editBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, authorId, year } = req.body;

  const book = books.find((book) => book.id === parseInt(id as string));

  if (!book) {
    return res.status(404).json({ message: "author not found" });
  }
  book.title = title ?? book.title;
  book.authorId = authorId ?? book.authorId;
  book.year = year ?? book.year;

  res.status(200).json(book);
};

//delete book by id
export const deleBook = (req: Request, res: Response) => {
  const { id } = req.params;

  const index = books.findIndex((book) => book.id === parseInt(id as string));
  if (index === -1) {
    return res.status(400).json({ message: "book not found" });
  }
  books.splice(index, 1);

  res.status(200).json({ message: "book deleted successfully" });
};
