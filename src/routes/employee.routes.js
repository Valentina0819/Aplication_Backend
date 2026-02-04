import { Router } from "express";
import {
  getEmployeeCont,
  getEmployeeByIdCont,
  createEmployeeCont,
  updateEmployeeCont,
  patchEmployeeCont,
  deleteEmployeeCont,
} from "../controllers/employee.controllers.js";

const router = Router();

router.get("/", getEmployeeCont);
router.get("/:id_employee", getEmployeeByIdCont);
router.post("/", createEmployeeCont);
router.put("/:id_employee", updateEmployeeCont);
router.patch("/:id_employee", patchEmployeeCont);
router.delete("/:id_employee", deleteEmployeeCont);

export default router;
