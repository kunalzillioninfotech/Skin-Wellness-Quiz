import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";

import { upload } from "../middleware/upload.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", verifyAdmin, upload.single("image"), addProduct);

router.delete("/:id", verifyAdmin, deleteProduct);

export default router;