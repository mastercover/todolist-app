import Task from "../models/task.js";
import debug from 'debug'

const logTask = debug('myapp:task')

export const getOne = async (req, res) => {
    const task = await Task.findOne({ slug: req.params.slug })
        .populate("author", "name")
        .populate("categories", "name slug");
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
};

export const getTasksByDate = async (req, res) => {
    try {
        const { date } = req.query; // YYYY-MM-DD
        if (!date) return res.status(400).json({ message: "Vui lòng truyền date (YYYY-MM-DD)" });

        const start = new Date(date);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const tasks = await Task.find({ createdAt: { $gte: start, $lte: end } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

export const getTasksByRange = async (req, res) => {
    try {
        const { from, to } = req.query; // YYYY-MM-DD
        if (!from || !to) return res.status(400).json({ message: "Vui lòng truyền from và to (YYYY-MM-DD)" });

        const start = new Date(from);
        const end = new Date(to);
        end.setHours(23, 59, 59, 999);

        const tasks = await Task.find({ createdAt: { $gte: start, $lte: end } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};
// Lấy tất cả task
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "username email");

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Tạo task mới
export const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, priority, assignedTo } = req.body;
        console.log("Creating task with data:", req.body);
        logTask("Creating task with data:", req.body);
        const task = new Task({ title, description, status, dueDate, priority, assignedTo });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: "Không tạo được task", error: err.message });
    }
};

export const create = async (req, res) => {
    const task = await Task.create({ ...req.body, author: req.user.uid });
    res.status(201).json(task);
};

// Cập nhật task
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Task không tồn tại" });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: "Không cập nhật được task", error: err.message });
    }
};

// Xoá task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task không tồn tại" });
        res.json({ message: "Xoá task thành công" });
    } catch (err) {
        res.status(500).json({ message: "Không xoá được task" });
    }
};
