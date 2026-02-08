import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM "user"');
  res.json(rows);
};

export const getUserById = async (req, res) => {
  const { id_user } = req.params;
  const { rows } = await pool.query('SELECT * FROM "user" WHERE id_user = $1', [
    id_user,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(rows[0]);
};

//Creación de usuario
export const createUser = async (req, res) => {
  const data = req.body;
  console.log(data);
  const { rows } = await pool.query(
    'INSERT INTO "user"(id_role, dni, user_name, password, first_name, last_name, email, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [
      data.id_role,
      data.dni,
      data.user_name,
      data.password,
      data.first_name,
      data.last_name,
      data.email,
      data.address,
    ],
  );
  return res.json(rows[0]);
};

//Eliminado físico
export const deleteUser = async (req, res) => {
  const { id_user } = req.params;
  const { rowCount } = await pool.query(
    'DELETE FROM "user" WHERE id_user = $1 RETURNING *',
    [id_user],
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  return res.sendStatus(204);
};

//Eliminado lógico (desactivar usuario)
export const softDeleteUser = async (req, res) => {
  const { id_user } = req.params;

  const { rows, rowCount } = await pool.query(
    'UPDATE "user" SET status = false WHERE id_user = $1 RETURNING *',
    [id_user],
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.json({
    message: "Usuario desactivado (eliminado lógicamente)",
    usuario: rows[0],
  });
};

//Reactivar usuario
export const reactivateUser = async (req, res) => {
  const { id_user } = req.params;

  const { rows, rowCount } = await pool.query(
    'UPDATE "user" SET status = true WHERE id_user = $1 RETURNING *',
    [id_user],
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.json({
    message: "Usuario reactivado correctamente",
    usuario: rows[0],
  });
};

export const updateUser = async (req, res) => {
  const { id_user } = req.params;
  const data = req.body;

  try {
    const { rows, rowCount } = await pool.query(
      'UPDATE "user" SET id_role = $1, dni = $2, user_name = $3, password = $4, first_name = $5, last_name = $6, email = $7, address = $8 WHERE id_user = $9 RETURNING *',
      [
        data.id_role,
        data.dni,
        data.user_name,
        data.password,
        data.first_name,
        data.last_name,
        data.email,
        data.address,
        id_user,
      ],
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({
      message: "Usuario actualizado correctamente",
      usuario: rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const patchUser = async (req, res) => {
  const { id_user } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);

  const setQuery = fields.map((field, i) => `${field} = $${i + 1}`).join(", ");

  const query = `UPDATE "user" SET ${setQuery} WHERE id_user = $${fields.length + 1} RETURNING *`;

  const { rows } = await pool.query(query, [...values, id_user]);

  res.json(rows[0]);
};

export const getUsersByTypeCont = async (req, res) => {
  try {
    const { role } = req.params; // 'employee' o 'client'
    const query = 'SELECT * FROM "users" WHERE role = $1';
    const result = await pool.query(query, [role]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};
