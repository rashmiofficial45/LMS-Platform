"use client"

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { GetCoursesQueryResult } from "../../sanity.types";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface CourseCardProps {
    course: GetCoursesQueryResult[number],
    progress?: number;
    href: string;
}

export function CourseCard({
    course, href, progress
}
    : CourseCardProps) {
    return (
        <Link href={href}>
            <Card className=" h-full group relative overflow-hidden rounded-[20px] border bg-card transition-all hover:shadow-lg">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {course.image && course.description ? (
                        <Image
                            src={urlFor(course.image).url() || ""}
                            alt={course.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 mt-0"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : null}
                    <div className="absolute right-3 top-3">
                        <div className="rounded-full bg-black/70 px-3 py-1.5 backdrop-blur-sm">
                            {"price" in course && typeof course.price === "number" && (
                                <span className="text-base font-medium text-white">
                                    {course.price === 0 ? "Free" : `$${course.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                    <div className="space-y-4 mt-auto px-5">
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold tracking-tight">{course.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {course.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 border-t pt-4">
                            {course.instructor?.photo && course.instructor?.name ? (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        className="object-cover"
                                        src={urlFor(course.instructor?.photo).url() || ""}
                                        alt={course.instructor?.name}
                                    />
                                    <AvatarFallback>{course.instructor?.name[0]}</AvatarFallback>
                                </Avatar>
                            ) : null}
                            <span className="text-sm text-muted-foreground">by {course.instructor?.name}</span>
                        </div>
                    {typeof progress === 'number' && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-1" />
                        </div>
                    )}
                </div>
            </Card>
        </Link>
    );
}
