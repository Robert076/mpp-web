import React from "react";
import { SignOut } from "../SignOut/SignOut";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  return <div></div>;
}
