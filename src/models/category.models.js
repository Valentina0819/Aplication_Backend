import { pool } from "../db.js";

// Obtener todas las categorías con el nombre de su departamento
export const getCategories = async () => {
  // Nota: Usamos JOIN con la tabla 'departments'
  const res = await pool.query(`
    SELECT 
      c.id_category, 
      c.name_category, 
      c.description, 
      c.id_department,
      d.name_departament 
    FROM category c
    LEFT JOIN department d ON c.id_department = d.id_department
    ORDER BY c.id_category DESC
  `);
  return res.rows; // En PG, los datos están en .rows
};

// Crear categoría
export const createCategory = async (
  name_category,
  description,
  id_department,
) => {
  const res = await pool.query(
    "INSERT INTO category (name_category, description, id_department) VALUES ($1, $2, $3) RETURNING *",
    [name_category, description, id_department],
  );
  return res.rows[0];
};

// Actualizar categoría
export const updateCategory = async (id, data) => {
  const { name_category, description, id_department } = data;
  const res = await pool.query(
    "UPDATE category SET name_category = $1, description = $2, id_department = $3 WHERE id_category = $4",
    [name_category, description, id_department, id],
  );
  return res;
};

// Eliminar categoría
export const deleteCategory = async (id) => {
  const res = await pool.query("DELETE FROM category WHERE id_category = $1", [
    id,
  ]);
  return res;
};
