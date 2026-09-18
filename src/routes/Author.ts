import {Router, Request, Response } from "express";
import {body, param, validationResult} from "express-validator";

const router = Router()

let Authors = [
    {id: 1, name: "Fundiswa",email:"Fundiswa@gmail.com" },
    {id: 2, name: "Zenande",email:"Zenande@gmail.com" },
    {id: 3, name: "Akhona",email:"Akhona@gmail.com" },
]

router.get("/",(req: Request, res: Response) => {
    res.status(200).json(Authors)
})

router.get("/:id", [param("id").isInt().withMessage("ID must be an integer")],
(req: Request, res: Response) => {
    const errors = validationResult(req)

    console.log(errors, "errors from express-validator middleware");

    if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
    }

    const {id} =req.params
    const Author = Authors.find((Author) => Author.id === parseInt(id as string));

    if(!Author){
        return res.status(400).send("Author not found")
    }

    res.status(200).json(Author)
}
)