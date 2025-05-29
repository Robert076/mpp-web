"use client";

import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [requires2FA, setRequires2FA] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.requires2FA) {
      setRequires2FA(true); // Prompt for 2FA code
    } else if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert(data.error || "Login failed");
    }
  }

  async function handleVerify2FA(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/verify-2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, code }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert(data.error || "Invalid or expired 2FA code");
    }
  }

  return (
    <form
      onSubmit={requires2FA ? handleVerify2FA : handleLogin}
      style={{
        backgroundColor: "#2b3137",
        width: "240px",
        padding: "20px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        disabled={requires2FA}
        style={{
          height: "30px",
          padding: "0 12px",
          borderRadius: "5px",
          border: "none",
          fontSize: "14px",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={requires2FA}
        style={{
          height: "30px",
          padding: "0 12px",
          borderRadius: "5px",
          border: "none",
          fontSize: "14px",
        }}
      />

      {requires2FA && (
        <input
          type="text"
          placeholder="Enter 2FA code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          style={{
            height: "30px",
            padding: "0 12px",
            borderRadius: "5px",
            border: "none",
            fontSize: "14px",
          }}
        />
      )}

      <button
        type="submit"
        style={{
          backgroundColor: "#4c5056",
          color: "white",
          height: "40px",
          borderRadius: "5px",
          border: "none",
          fontSize: "14px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        {requires2FA ? "Verify 2FA" : "Sign In"}
      </button>
    </form>
  );
}
