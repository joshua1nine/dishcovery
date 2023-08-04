import { NextResponse } from "next/server";
import deleteRecipe from "@/lib/deleteRecipe";

export async function POST(request: Request) {
  const res = await request.json();
  const { id } = res;

  await deleteRecipe(id);
  return NextResponse.json(
    {
      status: 200,
      message: `$Recipe has been successfully deleted`,
    },
    { status: 200 }
  );
}
