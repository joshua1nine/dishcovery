import BackBtn from "@/components/BackBtn";
import CreateIngredient from "@/components/CreateIngredient";
import IngredientsListItem from "@/components/IngredientsListItem";
import findIngredient from "@/lib/findIngredient";
import getAllIngredients from "@/lib/getAllIngredients";

export default async function Home() {
  const ingredients = await getAllIngredients();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn />
        <header className="my-4">
          <h2 className="text-3xl font-bold">Ingredients</h2>
        </header>
        <CreateIngredient />
        <div>
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
          <div className="">
            {ingredients?.map((ingredient) => {
              return <IngredientsListItem ingredient={ingredient} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
