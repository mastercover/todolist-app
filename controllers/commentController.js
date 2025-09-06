import Comment from "../models/comment.js";

export const forPost = async (req, res) => {
  const items = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 });
  res.json(items);
};

export const create = async (req, res) => {
  const c = await Comment.create({ ...req.body, author: req.user?.uid || undefined });
  res.status(201).json(c);
};
