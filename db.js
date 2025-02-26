import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5433,
  database: "bookdb",
  password: "sql"
});

export default pool;
