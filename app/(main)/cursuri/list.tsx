"use client";

import { cursuri, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  cursuri: (typeof cursuri.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ cursuri, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) {
      return;
    }

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      upsertUserProgress(id).catch(() =>
        toast.error("Failed to update progress")
      );
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {cursuri.map((curs) => (
        <Card
          key={curs.id}
          id={curs.id}
          title={curs.title}
          imageSrc={curs.imageSrc}
          onClick={onClick}
          disable={pending}
          active={curs.id === activeCourseId}
        />
      ))}
    </div>
  );
};
