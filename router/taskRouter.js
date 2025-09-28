import express from "express";
import { getTasks, createTask, updateTask, deleteTask, getTasksByDate, getTasksByRange } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/search/by-date", getTasksByDate);
router.get("/search/by-range", getTasksByRange);

export default router;
