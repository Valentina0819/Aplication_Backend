import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  patchUser,
  softDeleteUser,
  reactivateUser,
} from "../controllers/users.controllers.js";
const router = Router();

router.get("/", getUsers);
router.get("/:id_user", getUserById);
router.post("/", createUser);
router.delete("/:id_user", deleteUser);
router.put("/:id_user", updateUser);
router.patch("/:id_user", patchUser);
router.patch("/soft/:id_user", softDeleteUser);
router.patch("/reactivate/:id_user", reactivateUser);

export default router;
