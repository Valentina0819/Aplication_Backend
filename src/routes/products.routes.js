import { Router } from "express";
import {
  getProductsCont,
  getProductByIdCont,
  createProductCont,
  updateProductCont,
  deleteProductCont,
  patchProductCont,
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/", getProductsCont);
router.get("/:id_product", getProductByIdCont);
router.post("/", createProductCont);
router.put("/:id_product", updateProductCont);
router.delete("/:id_product", deleteProductCont);
router.patch("/:id_product", patchProductCont);

export default router;
