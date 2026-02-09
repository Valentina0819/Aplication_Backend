import app from "./app.js";
import { PORT } from "./config.js";
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import stockRoutes from "./routes/stock.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import departmentRoutes from "./routes/department.routes.js";

app.get("/", (req, res) => {
  res.send(
    "<h1>Servidor Funcionando</h1><p>El backend de Valentina está en línea.</p>",
  );
});

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/employee", employeeRoutes);
app.use("/stock", stockRoutes);
app.use("/category", categoryRoutes);
app.use("/department", departmentRoutes);

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});

import { pool } from "./db.js";

pool.connect((err, client, release) => {
  if (err) {
    return console.error("❌ Error adquiriendo cliente:", err.stack);
  }
  console.log("✅ Conexión a la base de datos establecida con éxito");
  release();
});
