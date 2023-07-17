import BackBtn from "@/components/BackBtn";
import getAllRecipes from "@/lib/getAllRecipes";
import Link from "next/link";
import { HiXCircle } from "react-icons/hi";

export default async function Recipes() {
  const recipes = await getAllRecipes();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn />
        <header className="my-4">
          <h2 className="text-3xl font-bold">Recipes</h2>
        </header>
        <div className="flex">
          {recipes?.map((recipe) => {
            return (
              <div
                key={recipe.id}
                className="flex justify-between items-center w-full p-2 rounded hover:bg-purple-50 cursor-pointer"
              >
                <Link href={`/recipes/${recipe.id}`}>
                  <div>
                    <p className="font-bold text-lg">{recipe.name}</p>
                    <span className="text-sm text-gray-600">
                      Prep: {recipe.prepTime} | Cook: {recipe.cookTime} |
                      Serves: {recipe.servings}
                    </span>
                  </div>
                </Link>
                <HiXCircle className="w-6 h-6 text-red-600" />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}