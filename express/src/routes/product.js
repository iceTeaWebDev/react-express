import express from "express";
import { add, get, remove, restore, update } from "../controllers/product";
import { checkPermission } from "../middlewares/checkAuth";
import { upload } from "../config/cloudinary";

const router = express.Router();

router.get("/products", get)
router.get("/products/:id", get)
router.post("/products", upload.array('images', 10), add);
router.put("/products/:id", upload.array('images', 10), update);
router.delete("/products/:id", remove);
router.patch("/products/:id", restore);

export default router;