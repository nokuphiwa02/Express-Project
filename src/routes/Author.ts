import {Router, Request, Response } from "express";
import {body, param, validationResult} from "express-validator";
import {getAllAuthors, getAuthorsById ,createUser} from "../contollers/Author"
import { Authors } from "../models";

const router = Router()

let authors = [
    // {id: 1, name: "Fundiswa",email:"Fundiswa@gmail.com" },
    // {id: 2, name: "Zenande",email:"Zenande@gmail.com" },
    // {id: 3, name: "Akhona",email:"Akhona@gmail.com" },
]

router.get("/",getAllAuthors) 
    


//http://localhost:3000/:id
router.get("/:id",
    [param("id").isInt().withMessage("ID must be an integer")],
    (req: Request, res: Response) => {
    const errors = validationResult(req)

    console.log(errors, "errors from express-validator middleware");

    if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
    }

     getAuthorsById(req, res)
})

  router.post("/",[
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Must be a valid email address"),
],
    (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
     createUser(req, res)
});
export default router;

