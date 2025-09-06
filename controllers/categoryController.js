import Category from "../models/category.js";

export const all = async (_req, res) => res.json(await Category.find().sort({ name: 1 }));

export const create = async (req, res) => {
  const item = await Category.create(req.body);
  res.status(201).json(item);
};
