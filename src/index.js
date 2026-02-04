import app from "./app.js";
import { PORT } from "./config.js";
import usersRoutes from "./routes/users.routes.js";
//import productosRoutes from "./routes/productos.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import stockRoutes from "./routes/stock.routes.js";

app.use("/users", usersRoutes);
//app.use("/productos", productosRoutes);
app.use("/employee", employeeRoutes);
app.use("/stock", stockRoutes);

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});

/*import { pool } from "./db.js";

pool
  .query("SELECT NOW()")
  .then((res) => console.log("DB conectada:", res.rows[0]))
  .catch((err) => console.error("Error DB:", err));
*/
