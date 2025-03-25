"use client";
import React, { useState } from "react";
import { SignOut } from "../SignOut/SignOut";
import { auth } from "@/auth";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [caliber, setCaliber] = useState("");
  const [weight, setWeight] = useState("");
  const [actionType, setActionType] = useState("");
  const [category, setCategory] = useState("");
  const [effectiveRange, setEffectiveRange] = useState("");
  const test = () => {
    console.log("baa");
    toast.success("Gun added successfully");
  };
  return (
    <div>
      <div
        className="buttons"
        style={{
          backgroundColor: "#2b3137",
          width: "100vw",
          height: "3.5vh",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavButtonDashboard onClick={test} text="Add gun" />
        <NavButtonDashboard text="Update gun" />
        <NavButtonDashboard text="Delete gun" />
        <NavButtonDashboard text="Sort by name" />
        <NavButtonDashboard text="Sort by caliber" />
      </div>
    </div>
  );
}
