import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { isNumber } from "@/helpers/helpers";

const pool = new Pool({
  user: 'admin',          
  host: 'localhost',
  database: 'guns',       
  password: 'admin',      
  port: 5432,
});

export async function GET() {
  try {
    const response = await pool.query('SELECT * FROM "Gun"'); 
    return NextResponse.json(response.rows); 
  } catch (error) {
    console.error('Error querying database', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { name, caliber, weight, actionType, category, effectiveRange } = body;

      if (!name || !caliber || !weight || !actionType || name.length < 3 || !isNumber(caliber) || !isNumber(weight) || (effectiveRange && !isNumber(effectiveRange))) {
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
        INSERT INTO "Gun" (name, caliber, weight, "actionType", category, "effectiveRange")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const values = [name, caliber, weight, actionType, category || null, effectiveRange || null];
      const res = await pool.query(query, values);
  
      return NextResponse.json(res.rows[0], { status: 201 });
    } catch (error) {
      console.error('Error inserting data:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { name, caliber, weight, actionType, category, effectiveRange } = body;

    if (!name || !caliber || !weight || !actionType || name.length < 3 || !isNumber(caliber) || !isNumber(weight) || (effectiveRange && !isNumber(effectiveRange))) {
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
      SET caliber = $2, weight = $3, "actionType" = $4, category = $5, "effectiveRange" = $6
      WHERE name = $1
      RETURNING *;
    `;

    const values = [name, caliber, weight, actionType, category || null, effectiveRange || null];
    const res = await pool.query(query, values);

    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error updating data:', error);
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
    console.error('Error updating data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}