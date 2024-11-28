import { getCursuri, getUserProgress } from "@/db/queries";
import { List } from "./list";
import React from "react";

const CoursesPage = async () => {
  const cursuriData = getCursuri();
  const userProgressData = getUserProgress();

  const [cursuri, userProgress] = await Promise.all([
    cursuriData,
    userProgressData,
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        Cursuri disponibile
      </h1>
      <List cursuri={cursuri} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
