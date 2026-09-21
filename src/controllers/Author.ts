import { Request, Response } from "express";
import { Authors } from "../models";
import { books } from "../controllers/Book"
import { param } from "express-validator"

 export let authors: Authors[] =[]

export const getAllAuthors = (req: Request, res: Response) => {
    res.status(200).json(authors)
}

export const getAuthorsById = (req: Request, res: Response) =>{
    const { id } = req.params
    const author = authors.find((author) => author.id === parseInt(id as string));

    if(!author){
        return res.status(404).send("user not found");
    }

    res.status(200).json(author);
}

   export const createAuthor =(req: Request, res: Response) => {
    const {name, email} = req.body
        const newAuthor= {id: authors.length + 1, name,email}
    
        authors.push(newAuthor);
    
        res.status(201).json(newAuthor);
}

