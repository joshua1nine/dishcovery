import { NextResponse } from "next/server";
import getAllRecipes from "@/lib/getAllRecipes";

export async function GET(request: Request) {
  const recipes = await getAllRecipes();
  return NextResponse.json(recipes);
}
