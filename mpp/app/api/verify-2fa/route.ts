import { NextResponse } from "next/server";
import { Pool } from "pg";
import jwt from "jsonwebtoken";

const pool = new Pool({
  user: "admin",
  host: "postgres",
  database: "guns",
  password: "admin",
  port: 5432,
});

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(request: Request) {
  const { username, code } = await request.json();

  // 1. Find user by username
  const userRes = await pool.query(
    `SELECT * FROM "User" WHERE username = $1`,
    [username]
  );
  const user = userRes.rows[0];

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 2. Check if code matches and is not expired
  if (
    user.two_fa_code !== code ||
    new Date(user.two_fa_code_expires_at) < new Date()
  ) {
    return NextResponse.json({ error: "Invalid or expired 2FA code" }, { status: 401 });
  }

  // 3. Clear the 2FA code fields (optional)
  await pool.query(
    `UPDATE "User" SET "two_fa_code" = NULL, "two_fa_code_expires_at" = NULL WHERE id = $1`,
    [user.id]
  );

  // 4. Issue JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
