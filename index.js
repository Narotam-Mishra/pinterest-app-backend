
import express from 'express';
import userRouter from './routes/user.route.js';

const app = express();

app.use("/", (req, res) => {
    return res.json("Welcome to Pinterest app backend...");
});

app.use("/users", userRouter);

const port = process.env.PORT || 7541;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})