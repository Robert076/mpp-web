"use client";

import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#2b3137",
        width: "240px",
        padding: "20px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
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
        style={{
          height: "30px",
          padding: "0 12px",
          borderRadius: "5px",
          border: "none",
          fontSize: "14px",
        }}
      />
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
        Sign In
      </button>
      {username}
      <br></br>
      {password}
    </form>
  );
}
