import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./DarkModeToggle";
import Link from "next/link";
import { BookHeart, BookOpen, FolderHeart, LogIn } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import SearchInput from "./SearchInput";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="sticky top-0 z-50 md:px-4 py-2 backdrop-blur-xl shadow-sm  dark:border-b-slate-300">
      <div className="flex items-center justify-between container mx-auto">
        {/* left side */}
        <div className="flex items-center justify-between px-3 gap-4">
          <Link href={"/"} prefetch={false}>
            <div className="flex items-center gap-1">
              <BookHeart className="h-5 w-5" />
              <span className="font-semibold text-lg">LMS</span>
            </div>
          </Link>
          <div><SearchInput/></div>
        </div>
        {/* right side */}
        <div className="flex items-center md:space-x-4">
          <div className="">
            {" "}
            <SignedIn>
              <Button
                size={"sm"}
                variant="ghost"
                className="cursor-pointer md:border-1"
              >
                <FolderHeart className="h-5 w-5" />
                <span className="hidden md:block">My Courses</span>
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button
                  variant="ghost"
                  size={"sm"}
                  className="cursor-pointer md:border-1"
                >
                  <LogIn />
                  <span className="hidden md:block">Sign In</span>
                </Button>
              </SignInButton>{" "}
            </SignedOut>
          </div>
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
