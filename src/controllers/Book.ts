import { Request, Response } from "express";
import { Books } from "../models";

let books: Books[] = [];

export const getAllBooks = (req: Request, res: Response) => {
  res.status(200).json(books);
};

export const getBooksById = (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === parseInt(id as string));

  if (!book) {
    return res.status(404).send("user not found");
  }

  res.status(200).json(book);
};

export const createBook = (req: Request, res: Response) => {
  const { title, author, year } = req.body;
  const newBook = { id: books.length + 1, title, author, year };

  books.push(newBook);

  res.status(201).json(newBook);
};
