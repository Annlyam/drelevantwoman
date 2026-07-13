// ***** THIS CONNECTION WAS USED FOR LOCAL NORMAL POSTGRESQL QURIES AND IS NO LONGER USED SINCE SUPABASE INTEGRATION ******

import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
}

const pool = new Pool({
    connectionString,
});

export default pool;
