import BackBtn from "@/components/BackBtn";
import getRecipe from "@/lib/getRecipe";
import Link from "next/link";

export default async function Recipes({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);

  console.log(recipe);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <div className="flex justify-between items-center">
          <BackBtn href="/recipes" />
          <Link href={`/recipes/edit/${params.id}`}>Edit</Link>
        </div>
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
          </div>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: recipe?.directions as string }}
          ></div>
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
              {recipe?.recipeingredient?.map((i) => {
                return (
                  <li key={i.public_id} className="list-disc">
                    {i.qty} {i?.unit?.abbr == "N/A" ? null : i?.unit?.abbr}{" "}
                    {i.ingredient?.name} {i.description}
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
