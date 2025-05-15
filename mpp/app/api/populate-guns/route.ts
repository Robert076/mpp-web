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
    const guns = [];
    for (let i = 0; i < 1000; i++) {
      const gun = {
        name: faker.commerce.productName(),
        caliber: faker.number.int({ min: 1, max: 50 }),
        weight: faker.number.int({ min: 1, max: 10 }),
        actionType: faker.helpers.arrayElement(["Semi-Automatic", "Automatic", "Bolt-Action", "Lever-Action"]),
        category: faker.helpers.arrayElement(["Rifle", "Pistol", "Shotgun"]),
        effectiveRange: faker.number.int({ min: 100, max: 2000 }),
        manufacturerId: faker.number.int({ min: 1, max: 10 })
      };
      guns.push(gun);
    }

    for (const gun of guns) {
      const query = `
        INSERT INTO "Gun" (name, caliber, weight, "actionType", category, "effectiveRange", "manufacturerId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [
        gun.name,
        gun.caliber,
        gun.weight,
        gun.actionType,
        gun.category,
        gun.effectiveRange,
        gun.manufacturerId
      ];
      await pool.query(query, values);
    }

    return NextResponse.json({ message: "Successfully populated guns table" });
  } catch (error) {
    console.error("Error populating guns:", error);
    return NextResponse.json(
      { error: "Failed to populate guns table" },
      { status: 500 }
    );
  }
} 