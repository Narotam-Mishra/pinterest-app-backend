
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ pin: postId })
    .populate("user", "username img displayName")
    .sort({ createdAt: -1 });
    
  res.status(200).json(comments);
};

export const addComments = async (req, res) => {
  const { description, pin } = req.body;

  const userId = req.userId;
  const newComment = await Comment.create({ description, pin, user: userId });

  res.status(201).json(newComment);
};