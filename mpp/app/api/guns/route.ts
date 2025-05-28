import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { isNumber } from "@/helpers/helpers";
import { ErrorMessages } from '@/enums/ErrorMessages';
import jwt from "jsonwebtoken";

const pool = new Pool({
  user: 'admin',          
  host: 'postgres',
  database: 'guns',       
  password: 'admin',      
  port: 5432,
});

const JWT_SECRET = process.env.JWT_SECRET || "Supersecretkey";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map(cookie => cookie.split("="))
    );
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userId;
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      userId = (payload as any).userId;
    } catch (e) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const response = await pool.query('SELECT * FROM "Gun" WHERE "userId" = $1', [userId]);

    return NextResponse.json(response.rows);
  } catch (error) {
    console.error("DB fetch error:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    // Parse JWT token from cookie
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => cookie.split("="))
    );
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userId;
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      userId = (payload as any).userId;
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Extract and validate body
    const body = await request.json();
    const { name, caliber, weight, actionType, category, effectiveRange, manufacturerId } = body;

    if (
      !name ||
      !caliber ||
      !weight ||
      !actionType ||
      name.length < 3 ||
      typeof caliber !== "number" ||
      typeof weight !== "number" ||
      (effectiveRange !== undefined && typeof effectiveRange !== "number") ||
      typeof manufacturerId !== "number"
    ) {
      return NextResponse.json(
        { error: "Bad request: Either null fields or invalid data" },
        { status: 400 }
      );
    }

    // Check if gun with same name exists
    const checkQuery = `SELECT * FROM "Gun" WHERE name=$1`;
    const checkRes = await pool.query(checkQuery, [name]);
    if (checkRes.rows.length > 0) {
      return NextResponse.json(
        { error: `Gun with the name ${name} already exists` },
        { status: 409 }
      );
    }

    // Insert new gun with userId as owner
    const insertQuery = `
      INSERT INTO "Gun" (name, caliber, weight, "actionType", category, "effectiveRange", "manufacturerId", "userId")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [
      name,
      caliber,
      weight,
      actionType,
      category || null,
      effectiveRange || null,
      manufacturerId,
      userId,
    ];

    const res = await pool.query(insertQuery, values);
    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error("DB insert error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { name, caliber, weight, actionType, category, effectiveRange, manufacturerId } = body;

    if (!name || !caliber || !weight || !actionType || name.length < 3 || !isNumber(caliber) || !isNumber(weight) || (effectiveRange && !isNumber(effectiveRange)) || !isNumber(manufacturerId)) {
      return NextResponse.json(
        { error: 'Bad request: Either null fields or invalid data' },
        { status: 400 }
      );
    }

    const checkIfGunWithSameNameExistsAlreadyQuery = `
          SELECT * FROM "Gun" WHERE name=$1
    `

    const paramsForCheckingIfGunWithSameNameAlreadyExists = [name];
    const doesGunWithSameNameAlreadyExist = await pool.query(checkIfGunWithSameNameExistsAlreadyQuery, paramsForCheckingIfGunWithSameNameAlreadyExists);

    if (doesGunWithSameNameAlreadyExist.rows.length === 0) {
      return NextResponse.json(
          { error: `You can only update already existing guns.`},
          { status: 409 }
      )
    }

    const query = `
      UPDATE "Gun" 
      SET caliber = $2, weight = $3, "actionType" = $4, category = $5, "effectiveRange" = $6, "manufacturerId" = $7
      WHERE name = $1
      RETURNING *;
    `;

    const values = [name, caliber, weight, actionType, category || null, effectiveRange || null, manufacturerId];
    const res = await pool.query(query, values);

    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error(ErrorMessages.QUERY_DB_UPDATE, ": ", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const checkIfGunWithSameNameExistsAlreadyQuery = `
          SELECT * FROM "Gun" WHERE name=$1
    `

    const paramsForCheckingIfGunWithSameNameAlreadyExists = [name];
    const doesGunWithSameNameAlreadyExist = await pool.query(checkIfGunWithSameNameExistsAlreadyQuery, paramsForCheckingIfGunWithSameNameAlreadyExists);

    if (doesGunWithSameNameAlreadyExist.rows.length === 0) {
      return NextResponse.json(
          { error: `You can only delete already existing guns.`},
          { status: 409 }
      )
    }

    const query = `
      DELETE FROM "Gun" WHERE name = $1 RETURNING *;
    `
    const params = [ name ];
    const res = await pool.query(query, params);

    return NextResponse.json(res.rows[0], { status: 201 })

  } catch (error) {
    console.error(ErrorMessages.QUERY_DB_DELETE, ":", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
