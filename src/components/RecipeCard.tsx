"use client";

import { Recipe } from "@/db/schema";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ComponentProps } from "react";
import { FaX } from "react-icons/fa6";
import { HiXCircle } from "react-icons/hi";

type RecipeCardComponentProps = ComponentProps<"div">;

type RecipeCardCustomProps = {
  recipe: Recipe;
};

type RecipeCardProps = Omit<
  RecipeCardComponentProps,
  keyof RecipeCardCustomProps | "type"
> &
  RecipeCardCustomProps;

export const RecipeCard = (props: RecipeCardProps) => {
  const { recipe, className, ...componentProps } = props;
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  let classes = clsx(
    className,
    "flex justify-between items-center w-full overflow-hidden rounded hover:bg-purple-50 cursor-pointer",
    isDeleting && "bg-gray-100 animate-pulse"
  );

  const handleDelete = async (id: Recipe["public_id"]) => {
    setIsDeleting(true);
    const res = await fetch(`http://localhost:3000/api/recipes/delete`, {
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
    }
  };

  return (
    <div {...componentProps} className={classes}>
      <Link
        href={`/recipes/${recipe.public_id}`}
        className="bg-purple-50 p-3 flex-1"
      >
        <p className="font-bold text-lg text-purple-950">{recipe.name}</p>
        <span className="text-sm text-purple-800">
          Prep: {recipe.prepTime} | Cook: {recipe.cookTime} | Serves:{" "}
          {recipe.servings}
        </span>
      </Link>
      <div
        className="text-white bg-purple-500 self-stretch p-3 flex justify-center items-center cursor-pointer"
        onClick={() => handleDelete(recipe.public_id)}
      >
        <FaX />
      </div>
      {/* <HiXCircle
        className="w-6 h-6 text-red-600"
        onClick={() => handleDelete(recipe.public_id)}
      /> */}
    </div>
  );
};
