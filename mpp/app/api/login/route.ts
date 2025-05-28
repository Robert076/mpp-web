import { ErrorMessages } from "@/enums/ErrorMessages";
import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const pool = new Pool({
  user: "admin",
  host: "postgres",
  database: "guns",
  password: "admin",
  port: 5432,
});

const JWT_SECRET = process.env.JWT_SECRET || "Supersecretkey";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing username or password" },
        { status: 400 }
      );
    }

    const checkUserQuery = `SELECT * FROM "User" WHERE username = $1`;
    const userRes = await pool.query(checkUserQuery, [username]);
    const user = userRes.rows[0];

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.hashed_password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
