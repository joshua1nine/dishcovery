import { config } from "@/db/config";
import getRecipe from "@/lib/getRecipe";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as schema from "@/db/schema";
import Link from "next/link";

export default async function Recipes({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);

  console.log("recipe", recipe?.recipeDirections);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <Link href="/">Back</Link>
        <header className="mb-4">
          <h2 className="text-4xl font-bold mb-2 text-center">
            {recipe?.name}
          </h2>
          <p className="py-2 rounded bg-purple-600 text-white text-center">
            Prep: {recipe?.prepTime} | Cook: {recipe?.cookTime} | Serves:{" "}
            {recipe?.servings}
          </p>
        </header>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Directions</h3>
            {recipe?.recipeDirections?.reverse().map((d) => {
              return (
                <div key={d.public_id}>
                  <p className="font-semibold">
                    {d.step}. {d.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: recipe?.notes as string }}
            ></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <ul className="px-4 space-y-2">
              {recipe?.recipeingredients?.map((i) => {
                return (
                  <li key={i.public_id} className="list-disc">
                    {i.amount} {i.ingredient?.units?.name} {i.ingredient?.name}{" "}
                    {i.description}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
