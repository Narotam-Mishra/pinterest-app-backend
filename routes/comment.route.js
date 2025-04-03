import express from 'express';
import { getPostComments, addComments } from '../controllers/comment.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/",verifyToken, addComments)

export default router;