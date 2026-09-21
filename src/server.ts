import bodyParser from "body-parser";
import express, { Express } from "express";
import { looggerMiddleware } from "./middleware/logger";
import authorRouter from "./routes/Author";
import bookRouter from "./routes/Book";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use(looggerMiddleware);
app.use("/Authors", authorRouter);
app.use("/Books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
