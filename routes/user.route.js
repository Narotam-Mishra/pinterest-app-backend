
import express from 'express';
import { test } from '../controllers/user.controller.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post("/create", async (req, res) => {
    const userInfo = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log("Hashed Password:", hashedPassword);

    await User.create({
        displayName: req.body.displayName,
        username: req.body.username,
        email: req.body.email,
        hashedPassword: hashedPassword,
    })
    res.json("user created!!");
});

router.delete("/delete", async (req, res) => {
    const delUser = await User.deleteOne({ username: "Mike"})
    res.json(delUser);
});

router.get("/test", test)

export default router;