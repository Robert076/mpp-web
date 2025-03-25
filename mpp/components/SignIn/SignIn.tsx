import { signIn } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      <button
        style={{
          backgroundColor: "#2b3137",
          width: "200px",
          height: "35px",
          padding: "5px 20px",
          color: "white",
          border: "none",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
        }}
        type="submit"
      >
        <img
          style={{
            width: "15px",
            height: "15px",
            paddingRight: "5px",
          }}
          src="./github.svg"
          alt=""
        />
        Continue with Github
      </button>
    </form>
  );
}
