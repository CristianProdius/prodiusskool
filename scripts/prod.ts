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

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Mathematics", imageSrc: "/math.png" }])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Algebra Basics",
            description: `Introduction to fundamental algebraic concepts`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Geometry Fundamentals",
            description: `Learn core geometric principles`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            {
              unitId: unit.id,
              title: "Variables",
              description: "Understanding variables",
              order: 1,
            },
            {
              unitId: unit.id,
              title: "Equations",
              description: "Solving simple equations",
              order: 2,
            },
            {
              unitId: unit.id,
              title: "Geometric Shapes",
              description: "Identifying basic shapes",
              order: 3,
            },
            {
              unitId: unit.id,
              title: "Angles",
              description: "Types of angles",
              order: 4,
            },
            {
              unitId: unit.id,
              title: "Area and Perimeter",
              description: "Calculating shape measurements",
              order: 5,
            },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: "What does x represent in the equation: 2x + 3 = 7?",
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: "Solve for x: x - 5 = 10",
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: "Which shape has 4 equal sides?",
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"Right Angle"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: "Calculate the area of a square with side 4",
                order: 5,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Unknown number",
                  imageSrc: "/variable.png",
                  audioSrc: "/math_variable.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Coefficient",
                  imageSrc: "/coefficient.png",
                  audioSrc: "/math_coefficient.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Constant",
                  imageSrc: "/constant.png",
                  audioSrc: "/math_constant.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "15",
                  imageSrc: "/number.png",
                  audioSrc: "/math_solution.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "5",
                  imageSrc: "/number.png",
                  audioSrc: "/math_wrong.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "10",
                  imageSrc: "/number.png",
                  audioSrc: "/math_wrong2.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Square",
                  imageSrc: "/square.png",
                  audioSrc: "/math_square.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Triangle",
                  imageSrc: "/triangle.png",
                  audioSrc: "/math_triangle.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Circle",
                  imageSrc: "/circle.png",
                  audioSrc: "/math_circle.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Acute Angle",
                  audioSrc: "/math_acute.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Right Angle",
                  audioSrc: "/math_right.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Obtuse Angle",
                  audioSrc: "/math_obtuse.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "16",
                  imageSrc: "/number.png",
                  audioSrc: "/math_16.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "8",
                  imageSrc: "/number.png",
                  audioSrc: "/math_8.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "12",
                  imageSrc: "/number.png",
                  audioSrc: "/math_12.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
