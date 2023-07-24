import BackBtn from "@/components/BackBtn";
import CreateRecipeForm from "@/components/CreateRecipeForm";
import EditRecipeForm from "@/components/EditRecipeForm";
import getAllIngredients from "@/lib/getAllIngredients";
import getAllUnits from "@/lib/getAllUnits";
import getRecipe from "@/lib/getRecipe";
import { z } from "zod";

export type Recipe = Awaited<ReturnType<typeof getRecipe>>;

export default async function page({ params }: { params: { id: string } }) {
  const ingredients = await getAllIngredients();
  const units = await getAllUnits();
  const recipe = await getRecipe(params.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn />
        <header className="my-4">
          <h2 className="text-3xl font-bold">Edit {recipe?.name}</h2>
        </header>
        <EditRecipeForm
          recipe={recipe}
          ingredients={ingredients}
          units={units}
        />
      </div>
    </main>
  );
}
