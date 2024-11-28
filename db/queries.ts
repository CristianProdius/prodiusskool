import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cursuri, userProgress } from "./schema";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getCursuri = cache(async () => {
  const data = await db.query.cursuri.findMany();

  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.cursuri.findFirst({
    where: eq(cursuri.id, courseId),
  });

  return data;
});
