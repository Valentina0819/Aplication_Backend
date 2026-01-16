import app from "./app.js";
import usersRoutes from "./routes/users.routes.js";
import { PORT } from "./config.js";

app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});

/*import { pool } from "./db.js";

pool
  .query("SELECT NOW()")
  .then((res) => console.log("DB conectada:", res.rows[0]))
  .catch((err) => console.error("Error DB:", err));
*/
