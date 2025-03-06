"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle the theme: if current is dark, set to light; otherwise, set to dark.
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="relative"
    >
      {/* Sun icon: visible in light mode */}
      {theme === "light" && (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300" />
      )}
      {theme === "dark" && (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all duration-300" />
      )}
    </Button>
  );
}
