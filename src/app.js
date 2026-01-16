import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(authRoutes);
app.use("/users", usersRoutes);

export default app;
