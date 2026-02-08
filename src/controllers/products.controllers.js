import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/products.models.js";

export const getProductsCont = async (req, res) => {
  try {
    const rows = await getProducts();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const getProductByIdCont = async (req, res) => {
  try {
    const product = await getProductById(req.params.id_product);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const createProductCont = async (req, res) => {
  try {
    const product = await createProduct(req);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const updateProductCont = async (req, res) => {
  try {
    // 1. Extraemos el ID de los parámetros de la URL
    const { id_product } = req.params;

    // 2. Llamamos al modelo pasando el req
    const updated = await updateProduct(req);

    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado correctamente",
      product: updated,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el producto en el servidor" });
  }
};

export const deleteProductCont = async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id_product);
    if (deleted === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

import { patchProduct } from "../models/products.models.js";

export const patchProductCont = async (req, res) => {
  try {
    const updated = await patchProduct(req);

    if (!updated) {
      return res.status(404).json({
        message:
          "Producto no encontrado o no se enviaron campos para actualizar",
      });
    }

    res.json({
      message: "Producto actualizado parcialmente (PATCH) con éxito",
      product: updated,
    });
  } catch (error) {
    console.error("Error en patchProductCont:", error);
    res
      .status(500)
      .json({ message: "Error al realizar la actualización parcial" });
  }
};
