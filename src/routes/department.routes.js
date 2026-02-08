import { Router } from "express";
import {
  getDepts,
  createDept,
  deleteDept,
} from "../controllers/department.controllers.js";

const router = Router();

// Departamentos
router.get("/", getDepts);
router.post("/", createDept);
router.delete("/:id_department", deleteDept);

export default router;
