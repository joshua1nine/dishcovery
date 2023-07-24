import BackBtn from "@/components/BackBtn";
import CreateIngredientForm from "@/components/CreateIngredientForm";
import IngredientsListItem from "@/components/IngredientsListItem";
import getAllCategories from "@/lib/getAllCategories";
import getAllIngredients from "@/lib/getAllIngredients";

export default async function Home() {
  const ingredients = await getAllIngredients();
  const categories = await getAllCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn href="/" />
        <header className="my-4">
          <h2 className="text-3xl font-bold">Ingredients</h2>
        </header>
        <CreateIngredientForm categories={categories} />
        <div className="mt-6">
          <div className="flex flex-col gap-2">
            {ingredients?.map((ingredient) => {
              return <IngredientsListItem ingredient={ingredient} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
