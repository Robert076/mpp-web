import { auth } from "@/auth";
import { SignOut } from "@/components/SignOut/SignOut";
import React from "react";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) return <>You must log in first.</>;
  return <SignOut />;
}
