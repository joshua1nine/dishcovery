import BackBtn from "@/components/BackBtn";
import { RecipeCard } from "@/components/RecipeCard";
import getAllRecipes from "@/lib/getAllRecipes";
import Link from "next/link";

export default async function Recipes() {
  const recipes = await getAllRecipes();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn href="/" />
        <header className="my-4">
          <h2 className="text-3xl font-bold">Recipes</h2>
        </header>
        <Link
          href="/recipes/create"
          className="p-4 rounded my-3 text-center w-full font-semibold text-white bg-purple-500"
          type="submit"
        >
          Add
        </Link>
        <div className="flex flex-col">
          {recipes?.map((recipe) => {
            return <RecipeCard recipe={recipe} />;
          })}
        </div>
      </div>
    </main>
  );
}
