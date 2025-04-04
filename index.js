
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import pinRouter from './routes/pin.route.js';
import commentRouter from './routes/comment.route.js';
import boardRouter from './routes/board.route.js';
import setUpDBConnection from './utilities/connectDB.js';
import cookieParser from 'cookie-parser';

const app = express();

// allow json parsing in request body
app.use(express.json());

// handle CORS issue
app.use(cors({ origin: process.env.Client_URL, credentials: true}));

// parse cookie
app.use(cookieParser());

// register routers
app.use("/users", userRouter);
app.use("/pins", pinRouter);
app.use("/comments", commentRouter);
app.use("/boards", boardRouter);

// home route for test
app.use("/", (req, res) => {
    res.send("Welcome to Pinterest app backend...");
});

const port = process.env.PORT || 7541;

app.listen(port, () => {
    setUpDBConnection();
    console.log(`Server is running on port: ${port}`);
})