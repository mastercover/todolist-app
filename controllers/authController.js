import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existed = await User.findOne({ email });
    if (existed) return res.status(409).json({ message: "Email already used" });
    const user = await User.create({ email, name, password });
    res.status(201).json({ id: user._id, email: user.email, name: user.name });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.compare(password)))
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ uid: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
