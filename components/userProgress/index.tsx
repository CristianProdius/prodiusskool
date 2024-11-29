import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { cursuri } from "@/db/schema";

type Props = {
  activeCourse: typeof cursuri.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/cursuri">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            height={40}
            width={40}
          />
        </Button>
      </Link>
      <Link href="/store">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.png"
            alt="Points"
            className="mr-2"
            height={38}
            width={38}
          />
          {points}
        </Button>
      </Link>
      <Link href="/store">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.png"
            alt="Hearts"
            className="mr-2"
            height={38}
            width={38}
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
