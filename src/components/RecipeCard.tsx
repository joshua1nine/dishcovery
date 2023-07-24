"use client";

import { Recipe } from "@/db/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ComponentProps } from "react";
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
  const { recipe, ...componentProps } = props;
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

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
    <div
      {...componentProps}
      className="flex justify-between items-center w-full p-2 rounded hover:bg-purple-50 cursor-pointer"
    >
      <Link href={`/recipes/${recipe.public_id}`}>
        <div>
          <p className="font-bold text-lg">{recipe.name}</p>
          <span className="text-sm text-gray-600">
            Prep: {recipe.prepTime} | Cook: {recipe.cookTime} | Serves:{" "}
            {recipe.servings}
          </span>
        </div>
      </Link>
      <HiXCircle
        className="w-6 h-6 text-red-600"
        onClick={() => handleDelete(recipe.public_id)}
      />
    </div>
  );
};
