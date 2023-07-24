"use client";

import { Ingredient } from "@/db/schema/ingredient";
import { SelectIngredient } from "@/lib/getAllIngredients";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiXCircle } from "react-icons/hi";

export default function IngredientsList({
  ingredient,
}: {
  ingredient: SelectIngredient;
}) {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: Ingredient["public_id"]) => {
    setIsDeleting(true);
    const res = await fetch(`http://localhost:3000/api/ingredients/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await res.json();

    if (json.status === 200) {
      setIsDeleting(false);
      router.refresh();
    } else {
      setIsDeleting(false);
      setErrorMessage(json.message);
    }
  };

  return (
    <div
      key={ingredient.public_id}
      className={`grid grid-cols-[3fr,2fr] py-1 px-2 rounded ${
        isDeleting ? "bg-gray-100 animate-pulse" : null
      }`}
    >
      <span className="p-2 pl-0">{ingredient.name}</span>
      <div className="flex items-center justify-between">
        <span className="p-2">{ingredient.category}</span>
        <HiXCircle
          className="w-6 h-6 text-red-600 cursor-pointer"
          onClick={() => handleDelete(ingredient.public_id)}
        />
      </div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
}
