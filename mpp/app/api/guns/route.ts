import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { isNumber } from "@/helpers/helpers";
import { ErrorMessages } from '@/enums/ErrorMessages';

const pool = new Pool({
  user: 'admin',          
  host: 'postgres',
  database: 'guns',       
  password: 'admin',      
  port: 5432,
});

export async function GET() {
  try {
    const response = await pool.query('SELECT * FROM "Gun"'); 
    return NextResponse.json(response.rows); 
  } catch (error) {
    console.error(ErrorMessages.QUERY_DB_SELECT, ": ", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
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

      if (doesGunWithSameNameAlreadyExist.rows.length > 0) {
        return NextResponse.json(
            { error: `Gun with the name ${doesGunWithSameNameAlreadyExist.rows[0].name} already exists`},
            { status: 409 }
        )
      }

      const query = `
        INSERT INTO "Gun" (name, caliber, weight, "actionType", category, "effectiveRange", "manufacturerId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [name, caliber, weight, actionType, category || null, effectiveRange || null, manufacturerId];
      const res = await pool.query(query, values);
  
      return NextResponse.json(res.rows[0], { status: 201 });
    } catch (error) {
      console.error(ErrorMessages.QUERY_DB_INSERT, ": ", error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
