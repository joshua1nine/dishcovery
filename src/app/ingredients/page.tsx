import BackBtn from "@/components/BackBtn";
import CreateIngredientForm from "@/components/CreateIngredientForm";
import IngredientsListItem from "@/components/IngredientsListItem";
import getAllCategories from "@/lib/getAllCategories";
import getAllIngredients from "@/lib/getAllIngredients";
import getAllUnits from "@/lib/getAllUnits";

export default async function Home() {
  const ingredients = await getAllIngredients();
  const units = await getAllUnits();
  const categories = await getAllCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn />
        <header className="my-4">
          <h2 className="text-3xl font-bold">Ingredients</h2>
        </header>
        <CreateIngredientForm units={units} categories={categories} />
        <div className="mt-6">
          <div className="grid grid-cols-[3fr,2fr,1fr] mb-2">
            <span className="p-2 pl-0 text-sm font-semibold uppercase">
              Name
            </span>
            <span className="p-2  text-sm font-semibold uppercase">
              Category
            </span>
            <span className="p-2 pr-0 text-sm font-semibold uppercase">
              Unit
            </span>
          </div>
          <div>
            {ingredients?.map((ingredient) => {
              return <IngredientsListItem ingredient={ingredient} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
