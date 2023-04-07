import express from "express";
import { get ,add, remove } from "../controllers/category";

const router = express.Router();

router.get("/categories/:id", get);
router.get("/categories", get);
router.post("/categories", add);
router.delete("/categories/:id", remove);

export default router;
