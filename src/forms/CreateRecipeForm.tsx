"use client";

import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import RichTextInput from "../components/RichTextInput";
import { insertRecipeIngredientSchema } from "@/db/schema/recipeIngredient";
import { Ingredient, insertIngredientSchema } from "@/db/schema/ingredient";
import { Unit } from "@/db/schema/unit";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertRecipeSchema } from "@/db/schema/recipe";
import { FaPlus } from "react-icons/fa6";
import SubmitBtn from "../components/SubmitBtn";
import { GetAllIngredients } from "@/lib/getAllIngredients";
import { ComponentProps } from "react";

type CreateRecipeFormComponentProps = ComponentProps<"form">;

type CreateRecipeFormCustomProps = {
  ingredients: Ingredient[];
  units: Unit[];
};

export type CreateRecipeFormProps = Omit<
  CreateRecipeFormComponentProps,
  keyof CreateRecipeFormCustomProps
> &
  CreateRecipeFormCustomProps;

const newRecipeFormSchema = insertRecipeSchema.extend({
  ingredients: z.array(insertRecipeIngredientSchema),
});

export type NewRecipeFormValues = z.infer<typeof newRecipeFormSchema>;

const recipe_id = nanoid();

export default function CreateRecipeForm(props: CreateRecipeFormProps) {
  const { ingredients, units, ...componentProps } = props;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewRecipeFormValues>({
    resolver: zodResolver(newRecipeFormSchema),
    defaultValues: {
      public_id: recipe_id,
      name: "",
      prepTime: NaN,
      cookTime: NaN,
      servings: NaN,
      ingredients: [
        {
          recipe_id: recipe_id,
          public_id: nanoid(),
          qty: NaN,
          unitId: "",
          ingredientId: "",
          description: "",
        },
      ],
      directions: "",
      notes: "",
    },
  });

  const onError = (errors: FieldErrors<NewRecipeFormValues>) =>
    console.log("Errors", errors);

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onSubmit: SubmitHandler<NewRecipeFormValues> = async (data) => {
    const res = await fetch(`http://localhost:3000/api/recipes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (json.status === 200) {
      router.push(`/recipes/${recipe_id}`);
    } else {
      console.log(json.errors);
    }
  };

  const handleDirectionsChange = (value: string) => {
    setValue("directions", value);
  };

  const handleNotesChange = (value: string) => {
    setValue("notes", value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      {...componentProps}
      className="space-y-8"
    >
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="font-semibold flex gap-1">
            Name
          </label>
          <input
            className={`w-full rounded-md ${
              errors.name?.message &&
              "outline outline-1 outline-red-600 border-red-600"
            }`}
            type="text"
            placeholder="Name"
            id="name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-600 italic font-normal">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="preTime" className="font-semibold">
              Prep Time
            </label>
            <input
              className={`rounded-md ${
                errors.prepTime?.message &&
                "outline outline-1 outline-red-600 border-red-600"
              }`}
              type="number"
              id="prepTime"
              {...register("prepTime", { valueAsNumber: true })}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="cookTime" className="font-semibold">
              Cook Time
            </label>
            <input
              className={`rounded-md ${
                errors.prepTime?.message &&
                "outline outline-1 outline-red-600 border-red-600"
              }`}
              type="number"
              id="cookTime"
              {...register("cookTime", { valueAsNumber: true })}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="serves" className="font-semibold">
              Serves
            </label>
            <input
              className={`rounded-md ${
                errors.prepTime?.message &&
                "outline outline-1 outline-red-600 border-red-600"
              }`}
              type="number"
              id="servings"
              {...register("servings", { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-s">Ingredients</label>
          <button
            type="button"
            className="flex gap-1 items-center text-white bg-purple-600 py-1 px-2 rounded-md"
            onClick={() =>
              append({
                public_id: nanoid(),
                recipe_id: recipe_id,
                qty: NaN,
                unitId: "",
                ingredientId: "",
                description: "",
              })
            }
          >
            <FaPlus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="grid grid-cols-2 gap-1">
                <div className="col-start-1 space-y-2">
                  <input
                    type="number"
                    id="qty"
                    placeholder="Qty"
                    className={`w-full rounded-md ${
                      errors.ingredients &&
                      errors.ingredients[index]?.qty?.message &&
                      "outline outline-1 outline-red-600 border-red-600"
                    }`}
                    {...register(`ingredients.${index}.qty` as const, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="col-start-2 space-y-2">
                  <select
                    className={`w-full rounded-md ${
                      errors.ingredients &&
                      errors.ingredients[index]?.unitId?.message &&
                      "outline outline-1 outline-red-600 border-red-600"
                    }`}
                    id="ingredientUnit"
                    {...register(`ingredients.${index}.unitId`)}
                  >
                    <option value="">Unit</option>
                    {units.map((unit: Unit) => {
                      return (
                        <option key={unit.public_id} value={unit.public_id}>
                          {unit.abbr}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-span-2 space-y-2">
                  <select
                    className={`w-full rounded-md ${
                      errors.ingredients &&
                      errors.ingredients[index]?.ingredientId?.message &&
                      "outline outline-1 outline-red-600 border-red-600"
                    }`}
                    id="ingredient"
                    {...register(`ingredients.${index}.ingredientId`)}
                  >
                    <option value="">Ingredient</option>
                    {ingredients.map((ingredient: Ingredient) => {
                      return (
                        <option
                          key={ingredient.public_id}
                          value={ingredient.public_id}
                        >
                          {ingredient.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-span-2 space-y-2">
                  <input
                    type="text"
                    id="ingredientDesc"
                    className="w-full rounded-md"
                    placeholder="e.g. diced, sliced, chopped, etc."
                    {...register(`ingredients.${index}.description` as const)}
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    className="col-span-2 p-2 font-semibold cursor-pointer rounded-md text-white bg-red-600"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })}
        </div>
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
          setValue={handleDirectionsChange}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="notes" className="font-semibold">
          Notes
        </label>
        <RichTextInput
          placeholder="Add some notes for your recipe..."
          setValue={handleNotesChange}
        />
      </div>
      <SubmitBtn text="Add" disabled={isSubmitting} />
    </form>
  );
}
