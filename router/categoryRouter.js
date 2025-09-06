import { Router } from "express";
import * as ctl from "../controllers/categoryController.js";
import { auth } from "./shared.js";
const r = Router();

r.get("/", ctl.all);
r.post("/", auth, ctl.create);

export default r;
