import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { RegistrationData,saveinfo } from './allotments/individual'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello from VITMUN-26 server')
})

app.post('/Individualregister', async (req: Request, res: Response) => {
    try {

        const data: RegistrationData = req.body;
        await saveinfo(data);
        res.status(201).send({ message: 'Registration successful!' });

    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).send({ message: 'Error saving registration.' });
    }
});

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`)
})
