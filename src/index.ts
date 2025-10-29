import 'dotenv/config'
import express from 'express';
import routes from './routes'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
