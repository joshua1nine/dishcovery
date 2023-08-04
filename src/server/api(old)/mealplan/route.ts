import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../../../db/config";
import * as schema from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { ingredient, recipeIngredient, unit } from "@/db/schema";
var convert = require("convert-units");

type GroceryItem = {
  id: string;
  name: string;
  qty: number;
  unit: string;
  measure: "volume" | "mass" | "each" | null;
  density: number | null;
};

const selectedRecipes = [
  "yCyKxA2ar3xi9cc9euXvq",
  "QjQsGKPeiMPfcqFa_krSm",
  // "OzW-LD3IYLpW1yMJaB8pL",
];

// const selectedRecipes = ["OzW-LD3IYLpW1yMJaB8pL"];

export async function GET(request: Request) {
  const connection = connect(config);
  const db = drizzle(connection, { schema });

  // Get all ingredients from selected recipes with ingredients and units
  const ingredientsList = await db
    .select({
      id: ingredient.public_id,
      qty: recipeIngredient.qty,
      name: ingredient.name,
      unit: unit.abbr,
      measure: unit.measure,
      density: ingredient.density,
    })
    .from(recipeIngredient)
    .innerJoin(
      ingredient,
      eq(recipeIngredient.ingredientId, ingredient.public_id)
    )
    .innerJoin(unit, eq(recipeIngredient.unitId, unit.public_id))
    .where(inArray(recipeIngredient.recipe_id, selectedRecipes));

  const combinedIngredients: GroceryItem[] = ingredientsList.reduce(
    (acc: GroceryItem[], ingredient: GroceryItem) => {
      // Search acc for for the an currIngredient with the same id and measure
      const existingIngredient = acc.find((item) => item.id === ingredient.id);

      if (
        existingIngredient?.measure === ingredient.measure &&
        existingIngredient?.unit === ingredient.unit
      ) {
        // Ingredient is exactly the same so just add the qty
        // Update existing ingredient with new qty
        existingIngredient.qty += ingredient.qty;
      } else if (
        existingIngredient?.measure === ingredient.measure &&
        existingIngredient?.measure !== "each"
      ) {
        // Ingredient is the same measure but different unit so convert
        const conBest = convert(ingredient.qty).from(ingredient.unit).toBest();
        // Update existing ingredient with converted qty
        existingIngredient.qty += conBest.val;
        existingIngredient.unit = conBest.unit;
        console.log(conBest);
      } else if (existingIngredient) {
        // Ingredient is different measure so convert to mass
        // TODO: Add logic to convert to volume if density is null
        console.log("unable to convert volume to mass", existingIngredient);
        acc.push({
          id: ingredient.id,
          qty: ingredient.qty,
          measure: ingredient.measure,
          name: ingredient.name,
          unit: ingredient.unit,
          density: ingredient.density,
        });
      } else {
        acc.push({
          id: ingredient.id,
          qty: ingredient.qty,
          measure: ingredient.measure,
          name: ingredient.name,
          unit: ingredient.unit,
          density: ingredient.density,
        });
      }

      return acc;
    },
    []
  );

  console.log(combinedIngredients.length);

  return NextResponse.json(combinedIngredients);
}
