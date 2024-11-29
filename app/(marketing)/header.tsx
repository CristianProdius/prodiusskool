"use client";

import React from "react";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-2-- px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.png" alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            ProdiusSkool
          </h1>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" variant="ghost">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export default Header;
