import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import * as schema from "../db/schema";

export default async function getRecipe(id: number) {
  const connection = connect(config);
  const db = drizzle(connection, { schema });

  const results = await db.query.recipes.findMany({
    with: {
      recipeingredients: {
        columns: {
          id: true,
          amount: true,
          description: true,
        },
        with: {
          ingredient: {
            columns: {
              id: true,
              name: true,
            },
            with: {
              units: { columns: { name: true } },
            },
          },
        },
      },
    },
  });

  return results;
}
