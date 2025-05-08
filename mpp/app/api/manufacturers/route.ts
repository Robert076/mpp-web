import { ErrorMessages } from "@/enums/ErrorMessages";
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    user: 'admin',          
    host: 'postgres',
    database: 'guns',       
    password: 'admin',      
    port: 5432,
});

export async function GET() {
    try {
        const response = await pool.query('SELECT * FROM "Manufacturer"');
        return NextResponse.json(response.rows);
    } catch(error) {
        console.error(ErrorMessages.QUERY_DB_SELECT);
        return NextResponse.error();
    }
}

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { name, description } = body;
  
      if (!name || name.length < 3 || !description || description.length < 3) {
        return NextResponse.json(
          { error: "Bad request: invalid name for manufacturer" },
          { status: 400 }
        );
      }
  
      const checkIfManufacturerWithSameNameExistsQuery = `
        SELECT * FROM "Manufacturer" WHERE name=$1
      `;
      const paramsForCheckingIfManufacturerWithSameNameExists = [name];
      const doesManufacturerWithSameNameExist = await pool.query(
        checkIfManufacturerWithSameNameExistsQuery,
        paramsForCheckingIfManufacturerWithSameNameExists
      );
  
      if (doesManufacturerWithSameNameExist.rows.length > 0) {
        return NextResponse.json(
          {
            error: `Manufacturer with the name ${doesManufacturerWithSameNameExist.rows[0].name} already exists`,
          },
          { status: 409 }
        );
      }
  
      const query = `
        INSERT INTO "Manufacturer" (name, description)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [name, description];
      const res = await pool.query(query, values);
  
      return NextResponse.json(res.rows[0], { status: 201 });
    } catch (error) {
      console.error("Error inserting manufacturer:", error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  

  export async function PUT(request: Request) {
    try {
      const body = await request.json();
      const { id, name, description } = body;
  
      if (!id || !name || name.length < 3 || !description || description.length < 3) {
        return NextResponse.json(
          { error: "Bad request: Either null fields or invalid data" },
          { status: 400 }
        );
      }
  
      const checkIfManufacturerExistsQuery = `
        SELECT * FROM "Manufacturer" WHERE id=$1
      `;
      const paramsForCheckingManufacturerExistence = [id];
      const manufacturerExist = await pool.query(
        checkIfManufacturerExistsQuery,
        paramsForCheckingManufacturerExistence
      );
  
      if (manufacturerExist.rows.length === 0) {
        return NextResponse.json(
          { error: `Manufacturer with ID ${id} does not exist.` },
          { status: 404 }
        );
      }
  
      const query = `
        UPDATE "Manufacturer" 
        SET name = $2, description = $3
        WHERE id = $1
        RETURNING *;
      `;
      const values = [id, name, description];
      const res = await pool.query(query, values);
  
      return NextResponse.json(res.rows[0], { status: 200 });
    } catch (error) {
      console.error("Error updating manufacturer: ", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  
  export async function DELETE(request: Request) {
    try {
      const body = await request.json();
      const { name } = body;
  
      if (!name) {
        return NextResponse.json(
          { error: "Bad request: Manufacturer name is required" },
          { status: 400 }
        );
      }
  
      const checkIfManufacturerExistsQuery = `
        SELECT * FROM "Manufacturer" WHERE name=$1
      `;
      const paramsForCheckingManufacturerExistence = [name];
      const manufacturerExist = await pool.query(
        checkIfManufacturerExistsQuery,
        paramsForCheckingManufacturerExistence
      );
  
      if (manufacturerExist.rows.length === 0) {
        return NextResponse.json(
          { error: `Manufacturer with ID ${name} does not exist.` },
          { status: 404 }
        );
      }
  
      const query = `
        DELETE FROM "Manufacturer" WHERE name = $1 RETURNING *;
      `;
      const params = [name];
      const res = await pool.query(query, params);
  
      return NextResponse.json(res.rows[0], { status: 200 });
    } catch (error) {
      console.error("Error deleting manufacturer: ", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  