import { auth } from "@/auth";
import DashboardPage from "@/components/DashboardPage/DashboardPage";
import React from "react";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) return <>You must log in first.</>;
  return <DashboardPage />;
}
