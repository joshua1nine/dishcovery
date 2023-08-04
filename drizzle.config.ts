import "dotenv/config";
import { env } from "./src/env/server.mjs";
// dotenv.config({ path: ".env.local" });
import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";

export default {
  schema: "./drizzle/schema/index.ts",
  out: "./drizzle/migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString: `mysql://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}/${env.DATABASE}?ssl={"rejectUnauthorized":true}`,
  },
} satisfies Config;
