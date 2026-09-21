import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import {
  getAllAuthors,
  getAuthorsById,
  getBooksByAuthor,
  createAuthor,
  editAuthor,
  deleteAuthor,
} from "../controllers/Author";
import { Authors } from "../models";

const router = Router();

// let authors = []

router.get("/", getAllAuthors);

router.get(
  "/:id/books",
  [param("id").isInt().withMessage("Author ID must be an integer")],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } //getting books by author Id
    getBooksByAuthor(req, res);
  },
);

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

    getAuthorsById(req, res);
  },
);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Must be a valid email address"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createAuthor(req, res);
  },
);
//Update Authors by Id
router.put(
  "/:id",
  [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Must be a valid email address"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    editAuthor(req, res);
  },
);

//Delete Authors by Id
router.delete(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer")],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    deleteAuthor(req, res);
  },
);

export default router;
