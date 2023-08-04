import createRecipe from "@/lib/createRecipe";
import createRecipeIngredients from "@/lib/createRecipeIngredients";
import { db } from "@/server/db";
import {
  Recipe,
  NewRecipe,
  recipe,
  recipeIngredient,
} from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const recipes: Recipe[] = await db.select().from(recipe);

  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const res = await request.json();

  const recipe: NewRecipe = {
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
    { status: 200, message: `${recipe.name} created` },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  const res = await request.json();
  const { id } = res;

  await db.delete(recipe).where(eq(recipe.public_id, id));
  await db.delete(recipeIngredient).where(eq(recipeIngredient.recipe_id, id));

  return NextResponse.json(
    {
      status: 200,
      message: `$Recipe has been successfully deleted`,
    },
    { status: 200 }
  );
}
