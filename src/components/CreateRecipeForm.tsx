"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, SetStateAction, useState } from "react";
import { InferModel, desc } from "drizzle-orm";
import { ingredients, recipeIngredients } from "@/db/schema";
import { HiXCircle } from "react-icons/hi";

type Ingredient = {
  id: number;
  name: string;
  category: string;
  unit: string;
};

type RecipeIngredient = {
  ingredientId: number;
  ingredientName: string;
  ingredientQty: number;
  ingredientDesc: string;
  ingredientUnit: string;
};

export default function CreateRecipeForm({
  ingredients,
}: {
  ingredients: any;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [serves, setServes] = useState(0);
  const [ingredientQty, setIngredientQty] = useState(0);
  const [ingredientDesc, setIngredientDesc] = useState("");
  // const [nextIngredient, setNextIngredient] = useState(0);
  const [nextIngredient, setNextIngredient] = useState<Ingredient>({
    id: 0,
    name: "",
    category: "",
    unit: "",
  });
  // const [selectedIngredients, setSelectedIngredients] = useState<
  //   SetStateAction<RecipeIngredient[]>
  // >([]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    RecipeIngredient[]
  >([]);
  // const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [directions, setDirections] = useState("");
  const [notes, setNotes] = useState("");

  console.log("ingredients", ingredients);

  const create = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/recipe/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    router.refresh();
  };

  const handleNextIngredientChange = (event: any) => {
    const selectedValue = JSON.parse(event.target.value);
    setNextIngredient(selectedValue);
  };

  const handleRemoveIngredient = (ing: number) => {
    setSelectedIngredients(
      selectedIngredients.filter((i) => i.ingredientId !== ing)
    );
  };

  console.log("selectedIngredients", selectedIngredients);

  return (
    <form onSubmit={create} className="space-y-4">
      <h3 className="font-bold text-lg">Details</h3>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="preTime" className="font-semibold">
          Prep Time
        </label>
        <input
          type="number"
          id="prepTime"
          value={prepTime}
          onChange={(e) => setPrepTime(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="cookTime" className="font-semibold">
          Cook Time
        </label>
        <input
          type="number"
          id="cookTime"
          value={cookTime}
          onChange={(e) => setCookTime(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="serves" className="font-semibold">
          Serves
        </label>
        <input
          type="number"
          id="serves"
          value={serves}
          onChange={(e) => setServes(Number(e.target.value))}
        />
      </div>

      <h3 className="font-bold text-lg">Ingredients</h3>
      <div className="grid grid-cols-[1fr,100px] gap-2">
        <div className="flex-1 flex flex-col space-y-2">
          <label htmlFor="nextIngredient" className="font-semibold">
            Ingredient
          </label>
          <select
            className="w-full"
            name="nextIngredient"
            id="nextIngredient"
            onChange={handleNextIngredientChange}
          >
            <option value="">Select Ingredient</option>
            {ingredients.map((ingredient: Ingredient) => {
              return (
                <option
                  key={ingredient.id}
                  value={JSON.stringify({
                    id: ingredient.id,
                    name: ingredient.name,
                    unit: ingredient.unit,
                  })}
                >
                  {ingredient.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="ingredientQty" className="font-semibold">
            Qty
          </label>
          <input
            type="number"
            id="ingredientQty"
            value={ingredientQty}
            onChange={(e) => setIngredientQty(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="ingredientDesc" className="font-semibold">
          Description
        </label>
        <input
          type="text"
          id="ingredientDesc"
          value={ingredientDesc}
          onChange={(e) => setIngredientDesc(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="p-4 rounded border my-3 w-full font-semibold text-purple-600 border-purple-600"
        onClick={() =>
          setSelectedIngredients([
            {
              ingredientName: nextIngredient.name,
              ingredientId: nextIngredient.id,
              ingredientQty: ingredientQty,
              ingredientDesc: ingredientDesc,
              ingredientUnit: nextIngredient.unit,
            },
            ...selectedIngredients,
          ])
        }
      >
        Add
      </button>
      {selectedIngredients.length > 0 && (
        <div className="py-6">
          <div className="grid grid-cols-[2fr,1fr] mb-2">
            <span className="px-2 py-1 pl-0 text-sm font-semibold uppercase">
              Name
            </span>
            <span className="px-2 py-1  text-sm font-semibold uppercase">
              Qty
            </span>
          </div>
          <div>
            {selectedIngredients.map((i: RecipeIngredient) => (
              <div key={i.ingredientId} className="grid grid-cols-[2fr,1fr]">
                <div className="flex flex-col p-2 pl-0">
                  <span className="">{i.ingredientName}</span>
                  <span className="text-gray-600 text-sm">
                    {i.ingredientDesc}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="p-2 pr-0 space-x-1">
                    <span className="">{i.ingredientQty}</span>
                    <span className="">{i.ingredientUnit}</span>
                  </div>
                  <HiXCircle
                    className="w-6 h-6 text-red-600 cursor-pointer"
                    onClick={() => handleRemoveIngredient(i.ingredientId)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <h3 className="font-bold text-lg">Notes</h3> */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="notes" className="font-semibold">
          Notes
        </label>
        <textarea
          id="notes"
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <button
        className="p-4 rounded my-3 w-full font-semibold text-white bg-purple-500"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
