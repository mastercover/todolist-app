import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

import authRouter from "./router/authRouter.js";
import postRouter from "./router/postRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import commentRouter from "./router/commentRouter.js";
import taskRouter from "./router/taskRouter.js";
import debug from 'debug'

const app = express();
const logApp = debug('myapp:server');
const logRoute = debug('myapp:routes');
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ ok: true, name: "blog-api" }));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);
app.use("/api/tasks", taskRouter);

const port = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(port, () => console.log(`🚀 Server running http://localhost:${port}`));
}).catch((err) => {
    console.error("❌ MongoDB connect error:", err);
    process.exit(1);
});
