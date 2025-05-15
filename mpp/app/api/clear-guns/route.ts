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
    // Delete all rows
    await pool.query('DELETE FROM "Gun";');
    
    // Reset the auto-incrementing ID sequence
    await pool.query('ALTER SEQUENCE "Gun_id_seq" RESTART WITH 1;');
    
    return NextResponse.json({ message: 'Guns table cleared and ID sequence reset' });
  } catch (error) {
    console.error('Error clearing guns table:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
