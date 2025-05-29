import { ErrorMessages } from "@/enums/ErrorMessages";
import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  user: 'admin',
  host: 'postgres',
  database: 'guns',
  password: 'admin',
  port: 5432,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, email } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing username or password or email" },
        { status: 400 }
      );
    }

    const checkUserQuery = `SELECT * FROM "User" WHERE username = $1`;
    const checkUserParams = [username];
    const existingUser = await pool.query(checkUserQuery, checkUserParams);

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "User with same username already exists!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `INSERT INTO "User" (username, hashed_password, email, has_2fa_enabled) VALUES ($1, $2, $3, $4) RETURNING id`;
    const insertUserParams = [username, hashedPassword, email, false];
    const result = await pool.query(insertUserQuery, insertUserParams);

    const userId = result.rows[0].id;

    return NextResponse.json(
      { message: "User created successfully", user: { id: userId, username, email } },
      { status: 201 }
    );
  } catch (error) {
    console.error(ErrorMessages.REGISTER_FAILED, ":", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
