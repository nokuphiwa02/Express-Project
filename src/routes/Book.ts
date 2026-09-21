import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import {
  getAllBooks,
  getBooksById,
  createBook,
  editBook,
} from "../controllers/Book";
import { Books } from "../models";

const router = Router();

//Get all Books
router.get("/", getAllBooks);

//Get Books BY Id
//http://localhost:3000/:id
router.get(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer")],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    console.log(errors, "errors from express-validator middleware");

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    getBooksById(req, res);
  },
);

//Create New Books
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("authorId")
      .isInt()
      .withMessage("Author ID is required and must be an integer"),
    body("year").isInt().withMessage("Year must be a valid number "),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createBook(req, res);
  },
);

//Update Books
router.put(
  "/:id",
  [
    param("id").isInt().withMessage("ID must be an integer"),
    body("title").optional().notEmpty().withMessage("Name is required"),
    body("authorId")
      .optional()
      .isInt()
      .withMessage("Author ID is required and must be an integer"),
    body("year").optional().isInt().withMessage("Year must be a valid number "),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    editBook(req, res);
  },
);
export default router;
