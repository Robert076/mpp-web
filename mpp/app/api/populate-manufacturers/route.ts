import { NextResponse } from "next/server";
import { Pool } from "pg";
import { faker } from "@faker-js/faker";
import { ErrorMessages } from "@/enums/ErrorMessages";

const pool = new Pool({
  user: 'admin',          
  host: 'postgres',
  database: 'guns',       
  password: 'admin',      
  port: 5432,
});

export async function POST() {
  try {
    const manufacturers = [];
    for (let i = 0; i < 1000; i++) {
      const manufacturer = {
        name: faker.company.name(),
        description: faker.company.catchPhrase()
      };
      manufacturers.push(manufacturer);
    }

    for (const manufacturer of manufacturers) {
      const query = `
        INSERT INTO "Manufacturer" (name, description)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [manufacturer.name, manufacturer.description];
      await pool.query(query, values);
    }

    return NextResponse.json({ message: "Successfully populated manufacturers table" });
  } catch (error) {
    console.error("Error populating manufacturers:", error);
    return NextResponse.json(
      { error: "Failed to populate manufacturers table" },
      { status: 500 }
    );
  }
} 