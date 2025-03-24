
import express from 'express';
import userRouter from './routes/user.route.js';
import pinRouter from './routes/pin.route.js';
import commentRouter from './routes/comment.route.js';
import boardRouter from './routes/board.route.js';
import setUpDBConnection from './utilities/connectDB.js';

const app = express();

// allow json parsing in request body
app.use(express.json());

// register routers
app.use("/users", userRouter);
app.use("/pins", pinRouter);
app.use("/comments", commentRouter);
app.use("/boards", boardRouter);

// home route for test
app.use("/", (req, res) => {
    return res.json("Welcome to Pinterest app backend...");
});

const port = process.env.PORT || 7541;

app.listen(port, () => {
    setUpDBConnection();
    console.log(`Server is running on port: ${port}`);
})