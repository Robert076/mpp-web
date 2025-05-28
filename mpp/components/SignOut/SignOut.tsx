"use client";

export function SignOut() {
  async function handleSignOut(event: React.FormEvent) {
    event.preventDefault();

    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      window.location.href = "/login";
    } else {
      alert("Failed to log out");
    }
  }

  return (
    <form onSubmit={handleSignOut}>
      <button
        type="submit"
        style={{
          border: "none",
          backgroundColor: "#539BF5",
          color: "white",
          cursor: "pointer",
          fontSize: "15px",
          height: "100%",
        }}
      >
        Sign Out
      </button>
    </form>
  );
}
