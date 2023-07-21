import {
  categories,
  ingredients,
  recipeDirections,
  recipeIngredients,
  recipes,
  units,
} from "@/db/schema";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { NextResponse } from "next/server";
import { mockCategories, mockUnits } from "@/db/mocks";
import { config } from "@/db/config";
import { nanoid } from "nanoid";
import { sql } from "drizzle-orm";

export async function GET(request: Request) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.delete(categories);
  await db.delete(units);
  await db.delete(recipeDirections);
  await db.delete(recipeIngredients);
  await db.delete(recipes);
  await db.delete(ingredients);

  await db.execute(sql`ALTER TABLE categories AUTO_INCREMENT = 1`);
  await db.execute(sql`ALTER TABLE units AUTO_INCREMENT = 1`);
  await db.execute(sql`ALTER TABLE recipedirections AUTO_INCREMENT = 1`);
  await db.execute(sql`ALTER TABLE recipeingredients AUTO_INCREMENT = 1`);
  await db.execute(sql`ALTER TABLE recipes AUTO_INCREMENT = 1`);
  await db.execute(sql`ALTER TABLE ingredients AUTO_INCREMENT = 1`);

  for (const category of mockCategories) {
    await db.insert(categories).values({
      name: category,
      public_id: nanoid(),
    });
  }

  for (const unit of mockUnits) {
    await db.insert(units).values({
      name: unit,
      public_id: nanoid(),
    });
  }

  return NextResponse.json({ message: "categories seeded" });
}
