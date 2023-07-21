"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiXCircle } from "react-icons/hi";

export default function IngredientsList({ ingredient }: { ingredient: any }) {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/ingredients/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await res.json();
    console.log(json);

    if (json.status === 200) {
      router.refresh();
    } else {
      setErrorMessage(json.message);
    }
  };

  return (
    <div key={ingredient.public_id} className="grid grid-cols-[3fr,2fr,1fr]">
      <span className="p-2 pl-0">{ingredient.name}</span>
      <span className="p-2">{ingredient.category}</span>
      <div className="flex items-center justify-between">
        <span className="p-2 pr-0">{ingredient.unit}</span>
        <HiXCircle
          className="w-6 h-6 text-red-600 cursor-pointer"
          onClick={() => handleDelete(ingredient.public_id)}
        />
      </div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
}
