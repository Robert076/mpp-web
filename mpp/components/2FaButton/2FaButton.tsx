"use client";

import toast from "react-hot-toast";

export function TwoFaButton() {
  async function handleToggle2FA(event: React.FormEvent) {
    event.preventDefault();

    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      toast.success(`2FA is now ${data.has_2fa_enabled ? "enabled" : "disabled"}`);
    } else {
      alert("Failed to toggle 2FA");
    }
  }

  return (
    <form onSubmit={handleToggle2FA}>
      <button
        type="submit"
        style={{
          border: "none",
          backgroundColor: "#539BF5",
          color: "white",
          cursor: "pointer",
          fontSize: "15px",
          height: "100%",
          marginRight: "10px",
          borderRadius: "5px",
          padding: "0 12px",
        }}
      >
        Toggle 2FA
      </button>
    </form>
  );
}
