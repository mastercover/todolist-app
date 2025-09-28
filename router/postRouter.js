import { Router } from "express";
import * as ctl from "../controllers/postController.js";
import { auth } from "./shared.js";
const r = Router();

r.get("/", ctl.list);
r.get("/:slug", ctl.getOne);
r.post("/", auth, ctl.create);
r.put("/:id", auth, ctl.update);
r.delete("/:id", auth, ctl.remove);
 
export default r;
