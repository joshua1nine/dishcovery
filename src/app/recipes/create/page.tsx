import BackBtn from "@/components/BackBtn";
import CreateRecipeForm from "@/components/CreateRecipeForm";
import getAllIngredients from "@/lib/getAllIngredients";

export default async function page() {
  const ingredients = await getAllIngredients();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn />
        <header className="my-4">
          <h2 className="text-3xl font-bold">New Recipe</h2>
        </header>
        <CreateRecipeForm ingredients={ingredients} />
      </div>
    </main>
  );
}
