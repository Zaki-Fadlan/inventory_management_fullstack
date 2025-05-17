import dotenv from "dotenv";
import { Pool } from "pg";
import logger from "./logger.js";
dotenv.config();

const pool = new Pool({
  host: process.env.USER_DB_HOST,
  port: Number(process.env.USER_DB_PORT),
  user: process.env.USER_DB_USER,
  password: process.env.USER_DB_PASSWORD,
  database: process.env.USER_DB_NAME,
});
pool.connect((err) => {
  if (err) {
    logger.error("Database connection error:", err.stack);
    process.exit(1);
  } else {
    logger.info("Connected to PostgreSQL");
    console.log("Connected to PostgreSQL");
  }
});

export default pool;
