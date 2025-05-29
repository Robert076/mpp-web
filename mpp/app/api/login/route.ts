import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

    const userRes = await pool.query(
      `SELECT * FROM "User" WHERE username = $1`,
      [username]
    );
    const user = userRes.rows[0];

    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    if (!user.has_2fa_enabled) {
      // No 2FA, issue token directly
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
        maxAge: 60 * 60 * 8, // 8h
      });

      return response;
    } else {
      // 2FA is enabled, generate code, store it, and send via email
      const twoFACode = Math.floor(100000 + Math.random() * 900000).toString();

      await pool.query(
        `UPDATE "User" SET "two_fa_code" = $1, "two_fa_code_expires_at" = NOW() + INTERVAL '10 minutes' WHERE id = $2`,
        [twoFACode, user.id]
      );

      // Send email with 2FA code
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // e.g., your@gmail.com
          pass: process.env.EMAIL_PASS, // app password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your 2FA Code",
        text: `Your 2FA code is: ${twoFACode}. It will expire in 10 minutes.`,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json({
        requires2FA: true,
        message: "2FA code sent to your email",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
