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

export async function PUT(request: Request) {
  try {
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

    const updateQuery = `
      UPDATE "User"
      SET "has_2fa_enabled" = NOT "has_2fa_enabled"
      WHERE id = $1
      RETURNING "has_2fa_enabled";
    `;
    const result = await pool.query(updateQuery, [userId]);

    return NextResponse.json(
      { has_2fa_enabled: result.rows[0].has_2fa_enabled },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling 2FA status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
