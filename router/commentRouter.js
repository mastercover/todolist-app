import { Router } from "express";
import * as ctl from "../controllers/commentController.js";
import { auth } from "./shared.js";
const r = Router();

r.get("/post/:postId", ctl.forPost);
r.post("/", auth, ctl.create);

export default r;
