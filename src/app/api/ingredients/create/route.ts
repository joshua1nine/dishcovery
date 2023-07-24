import { NextResponse } from "next/server";
import createIngredient from "@/lib/createIngredient";
import { NewIngredient } from "@/db/schema/ingredient";

export async function POST(request: Request) {
  const res: NewIngredient = await request.json();
  const { public_id, name, categoryId } = res;

  const newIngredient = await createIngredient({
    public_id,
    name,
    categoryId,
  });

  return NextResponse.json(
    { status: 200, message: newIngredient },
    { status: 200 }
  );
}
