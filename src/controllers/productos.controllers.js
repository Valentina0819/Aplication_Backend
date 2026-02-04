import { getProductos } from "../models/productos.models.js";

export const getProductosController = async (req, res) => {
  try {
    const rows = await getProductos();
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};
