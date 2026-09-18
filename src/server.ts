import bodyParser from 'body-parser';
import express , { Express } from 'express';

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(bodyParser.json())

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
}); 