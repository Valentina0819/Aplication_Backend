import { pool } from "../db.js";

// OBTENER todos los productos
export const getProducts = async () => {
  const query = 'SELECT * FROM "product"';
  const result = await pool.query(query);
  return result.rows;
};

// OBTENER producto por ID
export const getProductById = async (id_product) => {
  const query = 'SELECT * FROM "product" WHERE id_product = $1';
  const result = await pool.query(query, [id_product]);
  return result.rows[0];
};

// CREAR producto
export const createProduct = async (req) => {
  const { id_category, id_department, name_product, description, price } =
    req.body;

  // Validación preventiva
  if (!id_category || !id_department || !name_product || !price) {
    throw new Error("Faltan campos obligatorios para el producto.");
  }

  const query = `
    INSERT INTO "product" (id_category, id_department, name_product, description, price)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [id_category, id_department, name_product, description, price];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// ACTUALIZAR producto (PUT)
export const updateProduct = async (req) => {
  const { id_product } = req.params;
  const { id_category, id_department, name_product, description, price } =
    req.body;

  const query = `
    UPDATE "product"
    SET id_category = $1, id_department = $2, name_product = $3, description = $4, price = $5
    WHERE id_product = $6
    RETURNING *
  `;

  const result = await pool.query(query, [
    id_category,
    id_department,
    name_product,
    description,
    price,
    id_product,
  ]);

  return result.rows[0];
};

// ELIMINAR producto
export const deleteProduct = async (id_product) => {
  const query = 'DELETE FROM "product" WHERE id_product = $1';
  const result = await pool.query(query, [id_product]);
  return result.rowCount;
};

export const patchProduct = async (req) => {
  const { id_product } = req.params;
  const fields = Object.keys(req.body); // Obtiene nombres de columnas: ['name_product', 'price', etc]
  const values = Object.values(req.body); // Obtiene los valores correspondientes

  // Si no hay campos para actualizar, retornamos null
  if (fields.length === 0) return null;

  // Crea la cadena "columna1 = $1, columna2 = $2"
  const setQuery = fields.map((field, i) => `${field} = $${i + 1}`).join(", ");

  const query = `
    UPDATE "products"
    SET ${setQuery}
    WHERE id_product = $${fields.length + 1}
    RETURNING *
  `;

  // Combinamos los valores de los campos con el ID al final para el WHERE
  const result = await pool.query(query, [...values, id_product]);
  return result.rows[0];
};
