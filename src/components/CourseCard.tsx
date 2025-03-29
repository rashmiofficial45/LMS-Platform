"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GetCoursesQueryResult } from "../../sanity.types";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface Author {
    name: string;
    avatar: string;
    role: string;
}

interface CourseCardProps {
    course: GetCoursesQueryResult[number],
    progress: number;
    href: string;
}

export function CourseCard({
    course, href , progress
}
    : CourseCardProps) {
    return (
        <Link href={href}>
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative h-50 w-full">
                    {course.image && course.description ? (
                        <Image
                            src={urlFor(course.image).url() || ""}
                            alt={course.description}
                            fill
                            className="object-cover mt-0 p-0"
                        />) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        {/* {!isSignedIn && ( */}
                        <p className="text-sm text-white/90 line-clamp-2">
                            {course.description}
                        </p>
                        {/* )} */}
                        <div className="mt-2">
                            <span className="text-lg font-bold">
                                {"price" in course && typeof course.price === "number" && (
                                    <span className="text-lg font-bold text-white">{
                                        course.price === 0 ? "Free" : `$${course.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                                    }
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                {/* {isSignedIn && isPurchased && (
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            {course.instructor?.photo && course.instructor?.name ? (
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={urlFor(course.instructor?.photo).url() || course.instructor?.name[0]}
                                        alt={" by " + course.instructor?.name ||
                                            " by Ananomous Instructor"
                                        } />
                                    <AvatarFallback>{course.instructor?.name[0]}</AvatarFallback>
                                </Avatar>
                            ) : null}
                            <span className="text-sm font-medium">
                                {course.instructor?.name}
                            </span>
                        </div> */}
                        {/* <div className="flex space-x-2">
                {course.modules?.map((module, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(module._ref, '_blank');
                          }}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{module._key}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div> */}
                    {/* </div> */}
                    {
                    typeof progress === 'number' ?
                    (<>
                        <div className="space-y-2 px-6">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-1" />
                        </div></>):(<></>)
                    }
                {/* </CardContent>
        )} */}
            </Card>
        </Link>
    );
}

