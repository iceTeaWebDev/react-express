import express from "express";
import { get ,add, remove, getAll } from "../controllers/category";

const router = express.Router();

router.get("/categories/:id", get);
router.get("/categories", getAll);
router.post("/categories", add);
router.delete("/categories/:id", remove);

export default router;
