import pg from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  // Esto activa SSL solo cuando NO estás en localhost
  ssl: DB_HOST.includes("localhost") ? false : { rejectUnauthorized: false },
});
