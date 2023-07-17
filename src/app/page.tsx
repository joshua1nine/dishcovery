import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <h2 className="text-5xl font-bold text-center mb-8">Dishcovery</h2>
        <div className="space-y-4">
          <Link href={"/ingredients"} className="block">
            <p className="px-4 py-8 bg-purple-600 rounded text-white text-xl font-semibold text-center">
              Ingredients
            </p>
          </Link>
          <Link href={"/recipes"} className="block">
            <p className="px-4 py-8 bg-purple-600 rounded text-white text-xl font-semibold text-center">
              Recipes
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
