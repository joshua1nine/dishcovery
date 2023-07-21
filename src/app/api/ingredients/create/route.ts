import { NextResponse } from "next/server";
import createIngredient from "@/lib/createIngredient";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  const res = await request.json();
  const { public_id, name, category, unit } = res;

  const newIngredient = await createIngredient({
    public_id: nanoid(12),
    name,
    categoryId: category,
    unitId: unit,
  });

  return NextResponse.json(
    { status: 200, message: newIngredient },
    { status: 200 }
  );
}
