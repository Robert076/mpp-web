"use client";
import React, { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [caliber, setCaliber] = useState("");
  const [weight, setWeight] = useState("");
  const [actionType, setActionType] = useState("");
  const [category, setCategory] = useState("");
  const [effectiveRange, setEffectiveRange] = useState("");
  const [removeId, setRemoveId] = useState("");

  const [guns, setGuns] = useState<
    {
      name: string;
      caliber: string;
      weight: string;
      actionType: string;
      category: string;
      effectiveRange: string;
    }[]
  >([]);

  const addGun = () => {
    const newGun = { name, caliber, weight, actionType, category, effectiveRange };
    setGuns([...guns, newGun]);

    setName("");
    setCaliber("");
    setWeight("");
    setActionType("");
    setCategory("");
    setEffectiveRange("");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#eaeaea",
      }}
    >
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Caliber</label>
      <input type="text" value={caliber} onChange={(e) => setCaliber(e.target.value)} />
      <label>Weight</label>
      <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <label>Action type</label>
      <input type="text" value={actionType} onChange={(e) => setActionType(e.target.value)} />
      <label>Category</label>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <label>Effective range</label>
      <input
        type="text"
        value={effectiveRange}
        onChange={(e) => setEffectiveRange(e.target.value)}
      />
      <button onClick={addGun}>Add Gun</button>
      <ul>
        {guns.map((gun, index) => (
          <li key={index}>
            {`${gun.name} - ${gun.caliber} - ${gun.weight} - ${gun.actionType} - ${gun.category} - ${gun.effectiveRange}`}
          </li>
        ))}
      </ul>
      Remove id
      <input
        type="text"
        value={removeId}
        onChange={(e) => {
          setRemoveId(e.target.value);
        }}
      />
    </div>
  );
};

export default Home;
