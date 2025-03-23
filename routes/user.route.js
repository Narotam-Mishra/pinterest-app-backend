
import express from 'express';

const router = express.Router();

router.get("/test", (req, res) => {
    return res.json("Hello from user router")
})

export default router;