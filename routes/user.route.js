
import express from 'express';
import { test } from '../controllers/user.controller.js';
import User from '../models/user.model.js';

const router = express.Router();

router.post("/create", async (req, res) => {
    const userInfo = req.body;
    console.log("User Information:", userInfo);
    
    await User.create({
        displayName: req.body.displayName,
        username: req.body.username,
        email: req.body.email,
        // hashedPassword: req.body
    })
    res.json("user created!!");
})

router.get("/test", test)

export default router;