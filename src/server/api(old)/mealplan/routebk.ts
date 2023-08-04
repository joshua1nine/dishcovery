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

// const selectedRecipes = [
//   "yCyKxA2ar3xi9cc9euXvq",
//   "QjQsGKPeiMPfcqFa_krSm",
//   "bJYEjtY6dqvwPvN9eNKnb",
// ];

const selectedRecipes = ["OzW-LD3IYLpW1yMJaB8pL"];

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

  // Reduce ingredients to get total qty of duplicate ingredients
  // const reducedIngredients = ingredientsList.map((ingredient) => {
  //   const i = ingredientsList.reduce(
  //     (acc, currIngredient) => {
  //       if (
  //         currIngredient.id === acc.id &&
  //         currIngredient.measure === acc.measure &&
  //         currIngredient.unit === ingredient.unit
  //       ) {
  //         console.log({
  //           name: currIngredient.name,
  //           measure: currIngredient.measure,
  //           unit: currIngredient.unit,
  //         });

  //         const conBest = convert(currIngredient.qty)
  //           .from(currIngredient.unit)
  //           .toBest();

  //         return {
  //           id: currIngredient.id,
  //           qty: acc.qty + conBest.val,
  //           unit: conBest.unit,
  //         };
  //       } else if (
  //         currIngredient.id === ingredient.id &&
  //         currIngredient.measure !== ingredient.measure &&
  //         currIngredient.measure !== "each"
  //       ) {
  //         console.log(`Cannot convert volume to mass of ${ingredient.name}`);
  //         return {
  //           id: currIngredient.id,
  //           qty: currIngredient.qty,
  //           unit: currIngredient.unit,
  //         };
  //       } else {
  //         return {
  //           id: currIngredient.id,
  //           qty: currIngredient.qty,
  //           unit: currIngredient.unit,
  //         };
  //       }
  //     },
  //     { id: "", qty: 0, unit: "" }
  //   );
  //   return { ...ingredient, qty: i.qty, unit: i.unit };
  // });

  // const reducedIngredients = ingredientsList.map((ingredient) => {
  //   const qty = ingredientsList.reduce((acc, currIngredient) => {
  //     if (
  //       currIngredient.id === ingredient.id &&
  //       currIngredient.unit === ingredient.unit
  //     ) {
  //       return acc + currIngredient.qty;
  //       // TODO: Convert volume to mass
  //     } else if (
  //       currIngredient.id === ingredient.id &&
  //       currIngredient.measure === ingredient.measure
  //     ) {
  //       const convertedQty = convert(currIngredient.qty)
  //         .from(currIngredient.unit)
  //         .to(ingredient.unit);

  //       const conBest = convert(currIngredient.qty)
  //         .from(currIngredient.unit)
  //         .toBest();
  //       console.log(conBest);
  //       return acc + conBest.val;
  //     } else if (
  //       currIngredient.id === ingredient.id &&
  //       currIngredient.measure !== ingredient.measure &&
  //       currIngredient.measure !== "each"
  //     ) {
  //       // throw new Error(`Cannot convert volume to mass of ${ingredient.name}`);
  //       console.log(`Cannot convert volume to mass of ${ingredient.name}`);
  //       return acc;
  //     } else {
  //       return acc;
  //     }
  //   }, 0);
  //   return { ...ingredient, qty };
  // });

  // const reducedIngredients = ingredientsList.map((ingredient) => {
  //   const qty = ingredientsList.reduce((acc, currIngredient) => {
  //     if (currIngredient.id === ingredient.id) {
  //       return acc + currIngredient.qty;
  //     } else {
  //       return acc;
  //     }
  //   }, 0);
  //   return { ...ingredient, qty };
  // });

  // function filterDuplicateObjectsWithFilter(arr: GroceryItem[]) {
  //   const uniqueObjects = arr.filter((obj, index, self) => {
  //     // Find the index of the first occurrence of the object with the same ingredientId
  //     const firstIndex = self.findIndex((item) => item.id === obj.id);
  //     // Return true only if the current index is the same as the first occurrence
  //     return index === firstIndex;
  //   });

  //   return uniqueObjects;
  // }

  function separateDuplicates(array: GroceryItem[]) {
    const uniqueObjects = [];
    const duplicateObjects = [];

    // Create a Map to store objects based on their 'id'
    const idMap = new Map();
    const dupMap = new Map();

    for (const obj of array) {
      if (idMap.has(obj.id)) {
        // If 'id' already exists in the Map, it's a duplicate
        dupMap.set(obj.id, true);
        duplicateObjects.push(obj);
      } else {
        // If 'id' doesn't exist in the Map, it's a unique object
        idMap.set(obj.id, true);
        uniqueObjects.push(obj);
      }
    }

    // return [uniqueObjects, duplicateObjects, dupMap];
    return { uniqueObjects, duplicateObjects, dupMap, idMap };
  }

  const { uniqueObjects, duplicateObjects, dupMap, idMap } =
    separateDuplicates(ingredientsList);

  const reducedIng = uniqueObjects.map((ingredient) => {
    // Ingredient is a duplicate
    if (dupMap.has(ingredient.id)) {
      const qty = uniqueObjects.reduce((acc, currIngredient) => {
        if (currIngredient.id === ingredient.id) {
          return acc + currIngredient.qty;
        } else {
          return acc;
        }
      }, 0);
      return { ...ingredient, qty };
    }
    console.log("unique ingredient", ingredient.name);
    return { ...ingredient };
  });

  console.log("ingredientsList", ingredientsList);

  // console.log("Unique values:", uniqueValues);
  // console.log("Duplicate values:", duplicateValues);

  // const filteredIngredients =
  //   filterDuplicateObjectsWithFilter(reducedIngredients);

  // return NextResponse.json(filteredIngredients);
  return NextResponse.json(ingredientsList);
}
