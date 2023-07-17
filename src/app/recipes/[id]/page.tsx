import getRecipe from "@/lib/getRecipe";
import Link from "next/link";

export default async function Recipes({ params }: { params: { id: number } }) {
  const recipe = await getRecipe(params.id);
  const {
    name,
    prepTime,
    cookTime,
    servings,
    directions,
    notes,
    recipeingredients,
  } = recipe[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <Link href="/">Back</Link>
        <header className="mb-4">
          <h2 className="text-4xl font-bold mb-2 text-center">{name}</h2>
          <p className="py-2 rounded bg-purple-600 text-white text-center">
            Prep: {prepTime} | Cook: {cookTime} | Serves: {servings}
          </p>
        </header>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Directions</h3>
            <p>{directions}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p>{notes}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <ul className="px-4 space-y-2">
              {recipeingredients?.map((i) => {
                return (
                  <li key={i.id} className="list-disc">
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
