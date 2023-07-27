"use client";

import { Ingredient } from "@/db/schema/ingredient";
import { SelectIngredient } from "@/lib/getAllIngredients";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import { HiXCircle } from "react-icons/hi";
import { clsx } from "clsx";
import { FaX } from "react-icons/fa6";

type IngredientCardComponentProps = ComponentProps<"div">;

type IngredientCardCustomProps = {
  ingredient: SelectIngredient;
};

type IngredientCardProps = Omit<
  IngredientCardComponentProps,
  keyof IngredientCardCustomProps | "type"
> &
  IngredientCardCustomProps;

export default function IngredientCard(props: IngredientCardProps) {
  const { ingredient, className, ...componentProps } = props;
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  let classes = clsx(
    className,
    "flex justify-between items-center w-full rounded-lg overflow-hidden hover:bg-purple-50",
    isDeleting && "bg-gray-100 animate-pulse"
  );

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
    <>
      <div {...componentProps} className={classes}>
        <div className="bg-purple-50 p-3 flex-1">
          <p className="font-bold text-lg text-purple-950">{ingredient.name}</p>
          <span className="text-sm text-purple-800">{ingredient.category}</span>
        </div>
        <div
          className="text-white bg-purple-500 self-stretch p-3 flex justify-center items-center cursor-pointer"
          onClick={() => handleDelete(ingredient.public_id)}
        >
          <FaX />
        </div>
      </div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </>
  );
}
