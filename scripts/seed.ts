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
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
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

    await db.insert(schema.units).values([
      {
        id: 1,
        title: "Adunare",
        description: "Invata sa aduni",
        courseId: 1,
        order: 1,
      },
      {
        id: 2,
        title: "Scadere",
        description: "Invata sa scadi",
        courseId: 1,
        order: 2,
      },
      {
        id: 3,
        title: "Inmultire",
        description: "Invata sa inmultesti",
        courseId: 1,
        order: 3,
      },
      {
        id: 4,
        title: "Impartire",
        description: "Invata sa imparti",
        courseId: 1,
        order: 4,
      },
      {
        id: 5,
        title: "Antichitate",
        description: "Invata despre antichitate",
        courseId: 2,
        order: 1,
      },
      {
        id: 6,
        title: "Evul Mediu",
        description: "Invata despre evul mediu",
        courseId: 2,
        order: 2,
      },
      {
        id: 7,
        title: "Epoca Moderna",
        description: "Invata despre epoca moderna",
        courseId: 2,
        order: 3,
      },
      {
        id: 8,
        title: "Epoca Contemporana",
        description: "Invata despre epoca contemporana",
        courseId: 2,
        order: 4,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Adunare simpla",
        description: "Invata sa aduni simplu",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Adunare cu trecere peste ordin",
        description: "Invata sa aduni cu trecere peste ordin",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Adunare cu trecere peste ordin",
        description: "Invata sa aduni cu trecere peste ordin",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Scadere simpla",
        description: "Invata sa scadzi simplu",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Scadere cu trecere peste ordin",
        description: "Invata sa scadzi cu trecere peste ordin",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        order: 1,
        question: "2 + 2 = ?",
        type: "SELECT",
      },
      {
        id: 2,
        lessonId: 1,
        order: 2,
        question: "3 + 3 = ?",
        type: "SELECT",
      },
      {
        id: 3,
        lessonId: 1,
        order: 1,
        question: "9 + 9 = ?",
        type: "SELECT",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        text: "4",
        correct: true,
        imageSrc: null,
        audioSrc: null,
      },
      {
        id: 2,
        challengeId: 1,
        text: "5",
        correct: false,
        imageSrc: null,
        audioSrc: null,
      },
      {
        id: 3,
        challengeId: 1,
        text: "6",
        correct: false,
        imageSrc: null,
        audioSrc: null,
      },
      {
        id: 4,
        challengeId: 2,
        text: "6",
        correct: true,
        imageSrc: null,
        audioSrc: null,
      },
    ]);

    console.log("Seed complete");
  } catch (error) {
    console.error(error);
    throw new Error("Seed failed");
  }
};

main();
