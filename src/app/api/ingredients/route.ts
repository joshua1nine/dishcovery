import { NextResponse } from "next/server";
import getAllIngredients from "@/lib/getAllIngredients";

export async function GET(request: Request) {
  const ingredients = await getAllIngredients();
  return NextResponse.json(ingredients);
}
