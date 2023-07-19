import { NextResponse } from "next/server";
import deleteIngredient from "@/lib/deleteIngredient";
import findIngredient from "@/lib/findIngredient";
import createIngredient from "@/lib/createIngredient";

export async function POST(request: Request) {
  const res = await request.json();
  const { name, category, unit } = res;

  // console.log(name, category, unit);

  const newIngredient = await createIngredient({
    name,
    categoryId: category,
    unitId: unit,
  });

  return NextResponse.json(
    { status: 200, message: newIngredient },
    { status: 200 }
  );
}
