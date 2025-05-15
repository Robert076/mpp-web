import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: 'admin',          
  host: 'postgres',
  database: 'guns',       
  password: 'admin',      
  port: 5432,
});

export async function POST(request: Request) {
  try {
    // Delete all rows from Manufacturer
    await pool.query('DELETE FROM "Manufacturer";');

    // Reset the auto-incrementing ID sequence
    await pool.query('ALTER SEQUENCE "Manufacturer_id_seq" RESTART WITH 1;');

    return NextResponse.json({ message: 'Manufacturers table has been cleared and ID sequence reset' });
  } catch (error) {
    console.error('Error clearing manufacturers table:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
