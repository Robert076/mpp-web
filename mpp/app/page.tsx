"use client";
import React, { useState } from "react";
import Input from "./components/Input";

const Home = () => {
  const [name, setName] = useState("");
  return <Input value={name} onChange={setName} label="test" />;
};

export default Home;
