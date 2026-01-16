import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.controllers.js";
const router = Router();

router.get("/", getUsers);
router.get("/:id_user", getUserById);
router.post("/", createUser);
router.delete("/:id_user", deleteUser);
router.put("/:id_user", updateUser);

export default router;
