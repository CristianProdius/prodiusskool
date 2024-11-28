import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Clear existing data
    await db.delete(schema.cursuri);
    await db.delete(schema.userProgress);

    await db.insert(schema.cursuri).values([
      {
        id: 1,
        title: "Matematica",
        imageSrc: "/math.png",
      },
      {
        id: 2,
        title: "Istorie",
        imageSrc: "/history.png",
      },
      {
        id: 3,
        title: "Geografie",
        imageSrc: "/geo.png",
      },
      {
        id: 4,
        title: "Romana",
        imageSrc: "/ro.png",
      },
    ]);

    console.log("Seed complete");
  } catch (error) {
    console.error(error);
    throw new Error("Seed failed");
  }
};

main();
