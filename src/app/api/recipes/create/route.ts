import { NextResponse } from "next/server";
import createRecipe from "@/lib/createRecipe";
import createRecipeIngredients from "@/lib/createRecipeIngredients";
import { NewRecipeFormValues } from "@/components/CreateRecipeForm";

export async function POST(request: Request) {
  const res: NewRecipeFormValues = await request.json();

  const recipe = {
    public_id: res.public_id,
    name: res.name,
    cookTime: res.cookTime,
    prepTime: res.prepTime,
    servings: res.servings,
    notes: res.notes,
    directions: res.directions,
  };

  // Create Recipe
  await createRecipe(recipe);

  // Create Recipe Ingredients
  for (const i of res.ingredients) {
    await createRecipeIngredients(i);
  }

  return NextResponse.json(
    { status: 200, message: "new recipe" },
    { status: 200 }
  );
}
