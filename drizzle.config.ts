import type { Config } from "drizzle-kit";

export default {
  schema: ["./src/lib/schema.ts", "./src/lib/campus-schema.ts"],
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config;
