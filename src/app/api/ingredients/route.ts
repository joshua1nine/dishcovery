import findIngredient from "@/lib/findIngredient";
import { db } from "@/server/db";
import { Ingredient, NewIngredient, ingredient } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const ingredients: Ingredient[] = await db.select().from(ingredient);

  return NextResponse.json(ingredients);
}

export async function POST(request: Request) {
  const res: NewIngredient = await request.json();
  const { public_id, name, categoryId } = res;

  await db.insert(ingredient).values({
    public_id: public_id,
    name: name,
    categoryId: categoryId,
  });

  return NextResponse.json(
    { status: 200, message: `${name} created` },
    { status: 200 }
  );
}

// TODO: Double check this later
export async function DELETE(request: Request) {
  const res = await request.json();
  const { id } = res;
  const { ingredient: i, usedInRecipes } = await findIngredient(id);

  if (i.length == 0) {
    return NextResponse.json(
      { status: 500, message: "Ingredient not found" },
      { status: 500 }
    );
  } else if (usedInRecipes == true) {
    return NextResponse.json(
      {
        status: 500,
        message: `${i} is used in recipes and cannot be deleted`,
      },
      { status: 500 }
    );
  } else {
    await db.delete(ingredient).where(eq(ingredient.public_id, id));

    return NextResponse.json(
      {
        status: 200,
        message: `${ingredient.name} has been successfully deleted`,
      },
      { status: 200 }
    );
  }
}
