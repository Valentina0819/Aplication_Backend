import { Router } from "express";
import {
  getCats,
  createCat,
  updateCat,
  deleteCat,
} from "../controllers/category.controllers.js";

const router = Router();

router.get("/", getCats);
router.post("/", createCat);
router.put("/:id_category", updateCat);
router.delete("/:id_category", deleteCat);

export default router;
