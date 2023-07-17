"use client";

import React, { SetStateAction, useState } from "react";

const categories = [
  { id: 1, name: "Produce" },
  { id: 2, name: "Bakery" },
  { id: 3, name: "Dairy" },
  { id: 4, name: "Butcher" },
];

const units = [
  { name: "lb" },
  { name: "oz" },
  { name: "clove" },
  { name: "pkg" },
];

export default function CreateIngredient() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");

  const create = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/ingredients/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, category, unit }),
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <form onSubmit={create}>
      <pre>
        name: {name}
        category: {category}
        unit: {unit}
      </pre>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        name="category"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((category) => {
          return <option value={category.id}>{category.name}</option>;
        })}
      </select>
      <select name="unit" id="unit" onChange={(e) => setUnit(e.target.value)}>
        <option defaultValue="Select Unit">Select Unit</option>
        <option value="lb">lb</option>
        <option value="oz">oz</option>
        <option value="clove">clove</option>
        <option value="pkg">pkg</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
