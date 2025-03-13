
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});

export default pool;
