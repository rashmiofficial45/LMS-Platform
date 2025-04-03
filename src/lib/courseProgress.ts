// import { GetCompletionsQueryResult, Module } from "@/sanity.types";

import { Module, ProgressQueryResult } from "../../sanity.types";

export function calculateTotalLessons(modules: Module[] | null): number {
  if (!modules) return 0;
  return modules
    .filter((module) => module !== null && module !== undefined)
    .reduce((acc, module) => acc + (module.lessons?.length || 0), 0);

}

export function calculateCourseProgress(
  modules: Module[] | null,
  completedLessons: ProgressQueryResult["completedLessons"]
): number {
  const totalLessons = calculateTotalLessons(modules);
  const totalCompleted = completedLessons.length;

  return Math.round(
    totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0
  );
}
