import { pool } from "../db.js";

/**
 * Obtener todos los departamentos
 * En Postgres, los resultados vienen en la propiedad .rows
 */
export const getDepartments = async () => {
  const res = await pool.query(
    "SELECT * FROM department ORDER BY name_departament ASC",
  );
  return res.rows;
};

/**
 * Crear un departamento
 * Usamos $1, $2 y RETURNING para obtener el ID generado
 */
export const createDepartment = async (data) => {
  // 1. Recibimos el dato (asegúrate que desde el front también mandes 'name_departament')
  const { name_departament, description } = data;

  const res = await pool.query(
    // 2. Cambiamos el nombre de la columna en el INSERT a 'name_departament'
    "INSERT INTO department (name_departament, description) VALUES ($1, $2) RETURNING id_department",
    [name_departament, description || null],
  );

  return res.rows[0].id_department;
};

/**
 * Actualizar un departamento
 * Postgres no soporta "SET ?", hay que definir las columnas
 */
export const updateDepartment = async (id, data) => {
  const { name_department, description } = data;
  const res = await pool.query(
    "UPDATE department SET name_department = $1, description = $2 WHERE id_department = $3",
    [name_department, description, id],
  );
  return res;
};

/**
 * Eliminar un departamento
 */
export const deleteDepartment = async (id) => {
  const res = await pool.query(
    "DELETE FROM department WHERE id_department = $1",
    [id],
  );
  return res;
};
