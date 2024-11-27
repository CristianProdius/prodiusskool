import FeedWrapper from "@/components/Wrappers/feedWrapper";
import { StickyWrapper } from "@/components/Wrappers/stickyWrapper";
import React from "react";
import Header from "./header";
import UserProgress from "@/components/userProgress";

const Learn = () => {
  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Matematica", imageSrc: "/math.png" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Matematica" />
      </FeedWrapper>
    </div>
  );
};

export default Learn;
