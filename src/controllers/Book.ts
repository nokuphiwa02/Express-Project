import { Request, Response } from "express";
import { Books } from "../models";
import { authors } from "../controllers/Author";

export let books: Books[] = [];

export const getAllBooks = (req: Request, res: Response) => {
  res.status(200).json(books);
};

export const getBooksById = (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === parseInt(id as string));

  if (!book) {
    return res.status(404).send("Book not found");
  }

  res.status(200).json(book);
};

export const createBook = (req: Request, res: Response) => {
  const { title, authorId, year } = req.body;
  const newBook = { id: books.length + 1, title, authorId, year };

  books.push(newBook);

  res.status(201).json(newBook);
};
