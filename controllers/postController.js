import Post from "../models/post.js";

export const list = async (req, res) => {
  const { q, status, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (status) filter.status = status;
  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .populate("author", "name")
    .populate("categories", "name slug");
  res.json(posts);
};

export const getOne = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
    .populate("author", "name")
    .populate("categories", "name slug");
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
};

export const create = async (req, res) => {
  const post = await Post.create({ ...req.body, author: req.user.uid });
  res.status(201).json(post);
};

export const update = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
};

export const remove = async (req, res) => {
  const ok = await Post.findByIdAndDelete(req.params.id);
  if (!ok) return res.status(404).json({ message: "Not found" });
  res.json({ success: true });
};
