import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import * as schema from "../db/schema";
import { recipes } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function getRecipe(id: string) {
  const connection = connect(config);
  const db = drizzle(connection, { schema });

  const results = await db.query.recipes.findFirst({
    where: eq(recipes.public_id, id),
    with: {
      recipeDirections: {
        columns: {
          public_id: true,
          step: true,
          description: true,
        },
      },
      recipeingredients: {
        columns: {
          public_id: true,
          amount: true,
          description: true,
        },
        with: {
          ingredient: {
            columns: {
              public_id: true,
              name: true,
            },
            with: {
              units: {
                columns: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return results;
}
