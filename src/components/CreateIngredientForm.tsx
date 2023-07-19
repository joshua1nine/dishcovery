"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateIngredientForm({
  units,
  categories,
}: {
  units: any;
  categories: any;
}) {
  const router = useRouter();
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
    router.refresh();
  };

  return (
    <form onSubmit={create} className="space-y-4">
      <input
        className="w-full"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="w-full"
        name="category"
        id="category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Category</option>
        {categories.map((category: any) => {
          return <option value={category.id}>{category.name}</option>;
        })}
      </select>
      <select
        className="w-full"
        name="unit"
        id="unit"
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="">Unit</option>
        {units.map((unit: any) => {
          return <option value={unit.id}>{unit.name}</option>;
        })}
      </select>
      <button
        className="p-4 rounded my-3 w-full font-semibold text-white bg-purple-500"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
