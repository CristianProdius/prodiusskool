import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Mathematics",
        imageSrc: "/math.png",
      },
      {
        id: 2,
        title: "History",
        imageSrc: "/history.png",
      },
      {
        id: 3,
        title: "Geography",
        imageSrc: "/geo.png",
      },
      {
        id: 4,
        title: "Romanian-English",
        imageSrc: "/ro.png",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Algebra Basics",
        description: "Learn fundamental algebraic concepts",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: "Geometry Basics",
        description: "Learn fundamental geometric concepts",
        order: 2,
      },
      {
        id: 3,
        courseId: 2,
        title: "Ancient Civilizations",
        description: "Explore the earliest human societies",
        order: 1,
      },
      {
        id: 4,
        courseId: 3,
        title: "World Continents",
        description: "Learn about Earth's major landmasses",
        order: 1,
      },
      {
        id: 5,
        courseId: 4,
        title: "Basic Vocabulary",
        description: "Essential Romanian-English words",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Numbers and Operations",
        description: "Learn about numbers and basic operations",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Equations",
        description: "Learn about solving equations",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Inequalities",
        description: "Learn about inequalities",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Functions",
        description: "Learn about functions",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Polynomials",
        description: "Learn about polynomials",
      },
      {
        id: 6,
        unitId: 2,
        order: 1,
        title: "Points and Lines",
        description: "Learn about points and lines",
      },
      {
        id: 7,
        unitId: 2,
        order: 2,
        title: "Angles",
        description: "Learn about angles",
      },
      {
        id: 8,
        unitId: 2,
        order: 3,
        title: "Triangles",
        description: "Learn about triangles",
      },
      {
        id: 9,
        unitId: 2,
        order: 4,
        title: "Quadrilaterals",
        description: "Learn about quadrilaterals",
      },
      {
        id: 10,
        unitId: 2,
        order: 5,
        title: "Circles",
        description: "Learn about circles",
      },
      {
        id: 11,
        unitId: 3,
        order: 1,
        title: "Mesopotamia",
        description: "Study the ancient civilization of Mesopotamia",
      },
      {
        id: 12,
        unitId: 4,
        order: 1,
        title: "Europe",
        description: "Explore the continent of Europe",
      },
      {
        id: 13,
        unitId: 5,
        order: 1,
        title: "Greetings",
        description: "Learn basic greetings in Romanian",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "What is 5 + 3?",
      },
      {
        id: 2,
        lessonId: 1,
        type: "SELECT",
        order: 2,
        question: "What is 7 - 2?",
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: "What is 6 * 2?",
      },
      {
        id: 4,
        lessonId: 1,
        type: "SELECT",
        order: 4,
        question: "What is 9 / 3?",
      },
      {
        id: 5,
        lessonId: 1,
        type: "SELECT",
        order: 5,
        question: "What is 10 - 4?",
      },
      {
        id: 6,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: "Solve for x: x + 2 = 5",
      },
      {
        id: 7,
        lessonId: 2,
        type: "SELECT",
        order: 2,
        question: "Solve for x: 2x = 8",
      },
      {
        id: 8,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        question: "Solve for x: x - 3 = 2",
      },
      {
        id: 9,
        lessonId: 2,
        type: "SELECT",
        order: 4,
        question: "Solve for x: 3x = 9",
      },
      {
        id: 10,
        lessonId: 2,
        type: "SELECT",
        order: 5,
        question: "Solve for x: x / 2 = 4",
      },
      {
        id: 11,
        lessonId: 3,
        type: "SELECT",
        order: 1,
        question: "Which civilization developed cuneiform writing?",
      },
      {
        id: 12,
        lessonId: 4,
        type: "SELECT",
        order: 1,
        question: "Which country is located in Eastern Europe?",
      },
      {
        id: 13,
        lessonId: 5,
        type: "SELECT",
        order: 1,
        question: 'How do you say "Hello" in Romanian?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        correct: true,
        text: "8",
      },
      {
        challengeId: 1,
        correct: false,
        text: "7",
      },
      {
        challengeId: 1,
        correct: false,
        text: "9",
      },
      {
        challengeId: 2,
        correct: true,
        text: "5",
      },
      {
        challengeId: 2,
        correct: false,
        text: "4",
      },
      {
        challengeId: 2,
        correct: false,
        text: "6",
      },
      {
        challengeId: 3,
        correct: true,
        text: "12",
      },
      {
        challengeId: 3,
        correct: false,
        text: "10",
      },
      {
        challengeId: 3,
        correct: false,
        text: "14",
      },
      {
        challengeId: 4,
        correct: true,
        text: "3",
      },
      {
        challengeId: 4,
        correct: false,
        text: "2",
      },
      {
        challengeId: 4,
        correct: false,
        text: "4",
      },
      {
        challengeId: 5,
        correct: true,
        text: "6",
      },
      {
        challengeId: 5,
        correct: false,
        text: "5",
      },
      {
        challengeId: 5,
        correct: false,
        text: "7",
      },
      {
        challengeId: 6,
        correct: true,
        text: "3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "2",
      },
      {
        challengeId: 6,
        correct: false,
        text: "4",
      },
      {
        challengeId: 7,
        correct: true,
        text: "4",
      },
      {
        challengeId: 7,
        correct: false,
        text: "3",
      },
      {
        challengeId: 7,
        correct: false,
        text: "5",
      },
      {
        challengeId: 8,
        correct: true,
        text: "5",
      },
      {
        challengeId: 8,
        correct: false,
        text: "4",
      },
      {
        challengeId: 8,
        correct: false,
        text: "6",
      },
      {
        challengeId: 9,
        correct: true,
        text: "3",
      },
      {
        challengeId: 9,
        correct: false,
        text: "2",
      },
      {
        challengeId: 9,
        correct: false,
        text: "4",
      },
      {
        challengeId: 10,
        correct: true,
        text: "8",
      },
      {
        challengeId: 10,
        correct: false,
        text: "6",
      },
      {
        challengeId: 10,
        correct: false,
        text: "10",
      },
      {
        challengeId: 11,
        correct: true,
        text: "Sumerians",
      },
      {
        challengeId: 11,
        correct: false,
        text: "Egyptians",
      },
      {
        challengeId: 11,
        correct: false,
        text: "Greeks",
      },
      {
        challengeId: 12,
        correct: true,
        text: "Romania",
      },
      {
        challengeId: 12,
        correct: false,
        text: "Spain",
      },
      {
        challengeId: 12,
        correct: false,
        text: "France",
      },
      {
        challengeId: 13,
        correct: true,
        text: "Bună",
        audioSrc: "/ro_hello.mp3",
      },
      {
        challengeId: 13,
        correct: false,
        text: "La revedere",
        audioSrc: "/ro_goodbye.mp3",
      },
      {
        challengeId: 13,
        correct: false,
        text: "Mulțumesc",
        audioSrc: "/ro_thanks.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
