import { Router } from "express";

import { getProductosController } from "../controllers/productos.controllers.js";

const router = Router();

router.get("/", getProductosController);

export default router;
