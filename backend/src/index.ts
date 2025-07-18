import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router as rootRouter } from './routes/index'
import { router as signUpRouter } from './routes/signUpRoute'
import { router as logInRouter } from './routes/logInRoute'
import { router as logOutRouter } from './routes/logoutRoute'
import { router as postsRouter } from './routes/postsRoute'
// import { router as googleAuthRouter } from './routes/googleAuthRoute'
// import passport from 'passport';

const port: number | undefined = parseInt(process.env.PORT || '3000');
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.VITE_FRONTEND_URL || 'http://localhost:5173', 
  credentials: true
}));
app.use(cookieParser());

app.use('/', rootRouter);

app.use('/login', logInRouter);
app.use('/signup', signUpRouter);
app.use('/logout', logOutRouter);
//app.use('/auth', googleAuthRouter);

app.use('/api/posts', postsRouter);

//TODO: add a route for sharing

app.listen(port, '0.0.0.0', () => {
    console.log('Listening on port ' + port);
})