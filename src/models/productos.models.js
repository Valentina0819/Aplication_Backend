import { pool } from "../db.js";

export const getProductos = async () => {
  const query = 'SELECT * FROM "product"';
  const result = await pool.query(query);
  return result.rows;
};
