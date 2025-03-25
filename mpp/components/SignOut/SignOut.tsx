import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
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
