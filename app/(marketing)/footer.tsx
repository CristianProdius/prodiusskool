import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-t">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/math.png"
            alt="mathematics"
            width={40}
            height={40}
            className="mr-4 rounded-md"
          />
          Matematica
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/history.png"
            alt="mathematics"
            width={40}
            height={40}
            className="mr-4 rounded-md"
          />
          Istorie
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/geo.png"
            alt="mathematics"
            width={40}
            height={40}
            className="mr-4 rounded-md"
          />
          Geometrie
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
