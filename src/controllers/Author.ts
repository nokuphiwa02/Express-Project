import { Request, Response } from "express";
import { Authors } from "../models";
import { books } from "../controllers/Book";

//export authors so that i'll be able to import it in books controller
export let authors: Authors[] = [];

//get all Authors
export const getAllAuthors = (req: Request, res: Response) => {
  res.status(200).json(authors);
};

//get Author by id
export const getAuthorsById = (req: Request, res: Response) => {
  const { id } = req.params;
  const author = authors.find((author) => author.id === parseInt(id as string));

  if (!author) {
    return res.status(404).send("author not found");
  }

  res.status(200).json(author);
};

//get books by an authorId
export const getBooksByAuthor = (req: Request, res: Response) => {
  const { id } = req.params; // using filter to search the books with the author

  const authorBooks = books.filter(
    (book) => book.authorId === parseInt(id as string),
  );

  res.status(200).json(authorBooks);
};

//create an Author
export const createAuthor = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newAuthor = { id: authors.length + 1, name, email };

  authors.push(newAuthor);

  res.status(201).json(newAuthor);
};

//Update author by Id
export const editAuthor = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const author = authors.find((author) => author.id === parseInt(id as string));

  if (!author) {
    return res.status(404).json({ message: "author not found" });
  }
  author.name = name ?? author.name;
  author.email = email ?? author.email;

  res.status(200).json(author);
};

//delete author by Id
export const deleteAuthor = (req: Request, res: Response) => {
  const { id } = req.params;

  const index = authors.findIndex(
    (author) => author.id === parseInt(id as string),
  );
  if (index === -1) {
    return res.status(400).json({ message: "author not found" });
  }
  authors.splice(index, 1);

  res.status(200).json({ messege: "author deleted successfully" });
};
