import { pool } from "../db.js";

// GET all stock records
export const getStock = async (req, res) => {
  const query = 'SELECT * FROM "stock"';
  const result = await pool.query(query);
  return result.rows;
};

// GET stock by ID
export const getStockById = async (req, res) => {
  const { id_stock } = req.params;
  const query = 'SELECT * FROM "stock" WHERE id_stock = $1';
  const result = await pool.query(query, [id_stock]);
  return result.rows[0];
};

// CREATE stock record
export const createStock = async (req, res) => {
  const data = req.body;

  const query = `
    INSERT INTO "stock" (id_product, movement_type, quantity, movement_date, note_stock)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const result = await pool.query(query, [
    data.id_product,
    data.movement_type,
    data.quantity,
    data.movement_date,
    data.note_stock,
  ]);

  return result.rows[0];
};

// UPDATE stock (PUT)
export const updateStock = async (req, res) => {
  const { id_stock } = req.params;
  const data = req.body;

  const query = `
    UPDATE "stock"
    SET id_product = $1, movement_type = $2, quantity = $3, movement_date = $4, note_stock = $5
    WHERE id_stock = $6
    RETURNING *
  `;

  const result = await pool.query(query, [
    data.id_product,
    data.movement_type,
    data.quantity,
    data.movement_date,
    data.note_stock,
    id_stock,
  ]);

  return result.rows[0];
};

// PATCH stock (dinámico)
export const patchStock = async (req, res) => {
  const { id_stock } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);

  const setQuery = fields.map((field, i) => `${field} = $${i + 1}`).join(", ");

  const query = `
    UPDATE "stock"
    SET ${setQuery}
    WHERE id_stock = $${fields.length + 1}
    RETURNING *
  `;

  const result = await pool.query(query, [...values, id_stock]);
  return result.rows[0];
};

// Hard delete
export const deleteStock = async (req, res) => {
  const { id_stock } = req.params;

  const query = `DELETE FROM "stock" WHERE id_stock = $1`;
  const result = await pool.query(query, [id_stock]);

  return result.rowCount;
};
