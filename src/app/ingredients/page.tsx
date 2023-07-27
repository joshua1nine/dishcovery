import AddBtn from "@/components/AddBtn";
import BackBtn from "@/components/BackBtn";
import CreateIngredientForm from "@/forms/CreateIngredientForm";
import IngredientCard from "@/components/IngredientCard";
import getAllCategories from "@/lib/getAllCategories";
import getAllIngredients from "@/lib/getAllIngredients";

export default async function Ingredients() {
  const ingredients = await getAllIngredients();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn href="/" />
        <header className="my-4 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Ingredients</h2>
          <AddBtn href="/ingredients/create" />
        </header>
        <div className="mt-6">
          <div className="flex flex-col gap-2">
            {ingredients?.map((ingredient) => {
              return (
                <IngredientCard
                  key={ingredient.public_id}
                  ingredient={ingredient}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
