import express from 'express';
import cors from 'cors';
import { router as rootRouter } from './routes/index'
import { router as signUpRouter } from './routes/signUpRoute'
import { router as logInRouter } from './routes/logInRoute'
import { router as postsRouter } from './routes/postsRoute'
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient()

export default prisma;

const port: number | undefined = parseInt(process.env.PORT || '3000');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/', rootRouter)

app.use('/signup', signUpRouter)

app.use('/login', logInRouter);

app.use('/posts', postsRouter);

app.listen(port, ()=> {
    console.log('listening on port' + port);
})