import { Result } from "pg";
import { pool } from "../db.js";

export const getEmployee = async (req, res) => {
  const query = 'SELECT * FROM "employee"';
  const result = await pool.query(query);
  return result.rows;
};

// GET employee by ID
export const getEmployeeById = async (req, res) => {
  const { id_employee } = req.params;
  const query = 'SELECT * FROM "employee" WHERE id_employee = $1';
  const result = await pool.query(query, [id_employee]);
  return result.rows[0];
};

// CREATE new employee
export const createEmployee = async (req, res) => {
  const data = req.body;
  const query = ` INSERT INTO "employee" (id_user, phone_number, commission) VALUES ($1, $2, $3) RETURNING * `;
  const result = await pool.query(query, [
    data.id_user,
    data.phone_number,
    data.commission,
  ]);
  return result.rows[0];
};

// UPDATE employee (PUT)
export const updateEmployee = async (req, res) => {
  const { id_employee } = req.params;
  const data = req.body;
  const query = ` UPDATE "employee" SET id_user = $1, phone_number = $2, commission = $3 WHERE id_employee = $4 RETURNING * `;
  const result = await pool.query(query, [
    data.id_user,
    data.phone_number,
    data.commission,
    id_employee,
  ]);
  return result.rows[0];
};

// PATCH employee (dinámico)
export const patchEmployee = async (req, res) => {
  const { id_employee } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);
  const setQuery = fields.map((field, i) => `${field} = $${i + 1}`).join(", ");
  const query = ` UPDATE "employee" SET ${setQuery} WHERE id_employee = $${fields.length + 1} RETURNING * `;
  const result = await pool.query(query, [...values, id_employee]);
  return result.rows[0];
};

//Eliminado físico
export const deleteEmployee = async (req, res) => {
  const { id_employee } = req.params;
  const query = `DELETE FROM "employee" WHERE id_employee = $1`;
  const result = await pool.query(query, [id_employee]);
  return result.rowCount;
};
