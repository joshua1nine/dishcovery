import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import * as schema from "../db/schema";

export default async function getAllUnits() {
  const connection = connect(config);
  const db = drizzle(connection, { schema });

  const results = await db.query.units.findMany();

  return results;
}
