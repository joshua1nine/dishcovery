import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import * as schema from "@/db/schema";

export default async function getAllCategories() {
  const connection = connect(config);
  const db = drizzle(connection, { schema });

  const results = await db.query.category.findMany();

  return results;
}
