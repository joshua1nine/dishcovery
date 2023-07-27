import AddBtn from "@/components/AddBtn";
import BackBtn from "@/components/BackBtn";
import { RecipeCard } from "@/components/RecipeCard";
import getAllRecipes from "@/lib/getAllRecipes";

export default async function Recipes() {
  const recipes = await getAllRecipes();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn href="/" />
        <header className="my-4 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Recipes</h2>
          <AddBtn href="/recipes/create" />
        </header>
        <div className="flex flex-col gap-2">
          {recipes?.map((recipe) => {
            return <RecipeCard recipe={recipe} />;
          })}
        </div>
      </div>
    </main>
  );
}
