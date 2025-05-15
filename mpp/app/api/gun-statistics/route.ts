import { NextResponse } from "next/server";
import { Pool } from "pg";
import { ErrorMessages } from "@/enums/ErrorMessages";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  try {
    // Create indexes if they don't exist
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_gun_manufacturer ON "Gun" ("manufacturerId");
      CREATE INDEX IF NOT EXISTS idx_manufacturer_name ON "Manufacturer" (name);
    `);

    // Get total number of guns
    const totalGuns = await pool.query(`
      SELECT COUNT(*) as count
      FROM "Gun"
    `);

    // Get total number of manufacturers
    const totalManufacturers = await pool.query(`
      SELECT COUNT(*) as count
      FROM "Manufacturer"
    `);

    // Get manufacturers with their gun counts
    const manufacturersWithGuns = await pool.query(`
      SELECT 
        m.id,
        m.name,
        COUNT(g.id) as gun_count
      FROM "Manufacturer" m
      LEFT JOIN "Gun" g ON m.id = g."manufacturerId"
      GROUP BY m.id, m.name
      ORDER BY gun_count DESC
    `);

    return NextResponse.json({
      totalGuns: parseInt(totalGuns.rows[0].count),
      totalManufacturers: parseInt(totalManufacturers.rows[0].count),
      manufacturersWithGuns: manufacturersWithGuns.rows,
    });
  } catch (error) {
    console.error("Error fetching gun statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch gun statistics" },
      { status: 500 }
    );
  }
} 