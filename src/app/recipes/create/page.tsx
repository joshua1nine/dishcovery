import BackBtn from "@/components/BackBtn";
import CreateRecipeForm from "@/forms/CreateRecipeForm";
import getAllIngredients from "@/lib/getAllIngredients";
import getAllUnits from "@/lib/getAllUnits";

export default async function CreateRecipePage() {
  const ingredients = await getAllIngredients();
  const units = await getAllUnits();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn href="/recipes" />
        <header className="my-4">
          <h2 className="text-3xl font-bold">New Recipe</h2>
        </header>
        <CreateRecipeForm ingredients={ingredients} units={units} />
      </div>
    </main>
  );
}
