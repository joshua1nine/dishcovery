"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import {
  InsertRecipe,
  InsertUnit,
  SelectIngredient,
  SelectRecipeIngredient,
} from "@/db/schema";
import { HiXCircle } from "react-icons/hi";
import { nanoid } from "nanoid";
import RichTextInput from "./RichTextInput";
import { Recipe } from "@/app/recipes/edit/[id]/page";

type RecipeIngredient = Omit<SelectRecipeIngredient, "recipeId"> & {
  name: string;
  unitAbbr: string;
};

type Ingredient = Omit<SelectIngredient, "categoryId"> & {
  category: string;
};

type Unit = Pick<InsertUnit, "public_id" | "abbr">;

type EditRecipeFormComponentProps = ComponentProps<"form">;

type EditRecipeFormCustomProps = {
  ingredients: Ingredient[];
  units: InsertUnit[];
  recipe: Recipe;
};

export type EditRecipeFormProps = Omit<
  EditRecipeFormComponentProps,
  keyof EditRecipeFormCustomProps
> &
  EditRecipeFormCustomProps;

export default function EditRecipeForm({
  ingredients,
  units,
  recipe,
}: EditRecipeFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [prepTime, setPrepTime] = useState<string | null>("");
  const [cookTime, setCookTime] = useState<string | null>("");
  const [serves, setServes] = useState<number>(0);
  const [ingredientQty, setIngredientQty] = useState<string | null>("");
  const [ingredientDesc, setIngredientDesc] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState<Unit>({
    public_id: "",
    abbr: "",
  });
  const [nextIngredient, setNextIngredient] = useState<RecipeIngredient>({
    public_id: "",
    name: "",
    ingredientId: "",
    qty: 0,
    description: "",
    unitId: "",
    unitAbbr: "",
  });
  const [selectedIngredients, setSelectedIngredients] = useState<
    RecipeIngredient[]
  >([]);
  const [directions, setDirections] = useState("");
  const [notes, setNotes] = useState("");

  console.log("recipe", recipe);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setPrepTime(recipe.prepTime);
      setCookTime(recipe.cookTime);
      setServes(recipe.servings);
      setDirections(recipe.directions);
      setNotes(recipe.notes);
      setSelectedIngredients(recipe.recipeingredient);
    }
  }, []);

  const create = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/recipes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId: nanoid(),
        name,
        prepTime,
        cookTime,
        serves,
        notes,
        selectedIngredients,
        directions,
      }),
    });
    console.log("res", res);
    router.push("/recipes");
  };

  const handleNextIngredientChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = JSON.parse(event.target.value);
    setNextIngredient(selectedValue);
  };

  const handleIngredientUnitChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = JSON.parse(event.target.value);
    setIngredientUnit(selectedValue);
  };

  const handleSelectedIngredientsChange = () => {
    setSelectedIngredients([
      {
        public_id: nanoid(),
        name: nextIngredient.name,
        qty: ingredientQty,
        description: ingredientDesc,
        ingredientId: nextIngredient.public_id,
        unitId: ingredientUnit.public_id,
        unitAbbr: ingredientUnit.abbr,
      },
      ...selectedIngredients,
    ]);
  };

  const handleRemoveIngredient = (ing: SelectIngredient["public_id"]) => {
    setSelectedIngredients(
      selectedIngredients.filter((i) => i.ingredientId !== ing)
    );
  };

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
      <div className="grid grid-cols-3 gap-1">
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
      </div>
      <h3 className="font-bold text-lg">Ingredients</h3>
      <div>
        <div className="grid grid-cols-[1fr,100px,100px] gap-2">
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
                    key={ingredient.public_id}
                    value={JSON.stringify({
                      public_id: ingredient.public_id,
                      name: ingredient.name,
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
          <div className="flex-1 flex flex-col space-y-2">
            <label htmlFor="nextIngredient" className="font-semibold">
              Unit
            </label>
            <select
              className="w-full"
              name="ingredientUnit"
              id="ingredientUnit"
              onChange={handleIngredientUnitChange}
            >
              <option value="">Select</option>
              {units.map((unit: InsertUnit) => {
                return (
                  <option
                    key={unit.public_id}
                    value={JSON.stringify({
                      public_id: unit.public_id,
                      abbr: unit.abbr,
                    })}
                  >
                    {unit.abbr}
                  </option>
                );
              })}
            </select>
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
          onClick={handleSelectedIngredientsChange}
        >
          Add
        </button>
        {selectedIngredients.length > 0 && (
          <div className="py-6">
            <div>
              {selectedIngredients.map((i: RecipeIngredient) => (
                <div key={i.ingredientId} className="grid grid-cols-[2fr,1fr]">
                  <div className="flex flex-col p-2 pl-0">
                    <span className="">{i.name}</span>
                    <span className="text-gray-600 text-sm">
                      {i.description}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="p-2 pr-0 space-x-1">
                      <span className="">{i.qty}</span>
                      <span className="">{i.unitAbbr}</span>
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
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="notes" className="font-semibold">
          Directions
        </label>
        <RichTextInput
          placeholder={`Add directions for your recipe...

1. Cut the onions.
2. Try not to cry.
3. Cry a lot.`}
          value={directions}
          setValue={setDirections}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="notes" className="font-semibold">
          Notes
        </label>
        <RichTextInput
          placeholder="Add some notes for your recipe..."
          value={notes}
          setValue={setNotes}
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
