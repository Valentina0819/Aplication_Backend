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
    ]
  );
  return res.json(rows[0]);
};

export const deleteUser = async (req, res) => {
  const { id_user } = req.params;
  const { rowCount } = await pool.query(
    'DELETE FROM "user" WHERE id_user = $1 RETURNING *',
    [id_user]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  return res.sendStatus(204);
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
      ]
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
