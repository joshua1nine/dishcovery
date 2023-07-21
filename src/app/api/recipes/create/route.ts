import { NextResponse } from "next/server";
import deleteIngredient from "@/lib/deleteIngredient";
import findIngredient from "@/lib/findIngredient";
import createIngredient from "@/lib/createIngredient";
import { nanoid } from "nanoid";
import { InferModel } from "drizzle-orm";
import { recipes } from "../../../../../drizzle/schema";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import createRecipe from "@/lib/createRecipe";
import { config } from "@/db/config";
import { recipeDirections, recipeIngredients } from "@/db/schema";
import createRecipeIngredients from "@/lib/createRecipeIngredients";
import createRecipeDirections from "@/lib/createRecipeDirections";

type NewRecipeIngredient = InferModel<typeof recipeIngredients, "insert">;
type NewRecipeDirection = InferModel<typeof recipeDirections, "insert">;

export async function POST(request: Request) {
  const res = await request.json();

  const recipe = {
    public_id: res.recipeId,
    name: res.name,
    cookTime: res.cookTime,
    prepTime: res.prepTime,
    servings: res.serves,
    notes: res.notes,
  };

  const recipeIngredients = res.selectedIngredients.map((i: any) => {
    const ingredient: NewRecipeIngredient = {
      public_id: nanoid(),
      amount: i.ingredientQty,
      description: i.ingredientDesc,
      recipeId: res.recipeId,
      ingredientId: i.ingredientId,
    };

    return ingredient;
  });

  const recipeDirections = res.directions.map((d: string, index: number) => {
    const direction: NewRecipeDirection = {
      public_id: nanoid(),
      description: d,
      step: index + 1,
      recipeId: res.recipeId,
    };

    return direction;
  });

  // Create Recipe
  await createRecipe(recipe);

  // Create Recipe Ingredients
  for (const i of recipeIngredients) {
    await createRecipeIngredients(i);
  }

  // Create Recipe Directions
  for (const d of recipeDirections) {
    await createRecipeDirections(d);
  }

  return NextResponse.json(
    { status: 200, message: "new recipe" },
    { status: 200 }
  );
}
