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
    course, progress, href
}
    : CourseCardProps) {
    return (
        // <motion.div
        //     whileHover={{
        //         scale: 1.02,
        //         rotateY: 5,
        //         translateZ: 20
        //     }}
        //     transition={{
        //         type: "spring",
        //         stiffness: 300,
        //         damping: 20
        //     }}
        //     className="perspective-1000"
        // >
            <Link href={href}>
                <Card className="mx-auto">
                    <div className="relative h-50 w-full ">
                        {course.image && course.description ? (
                            <Image
                                src={urlFor(course.image).url() || ""}
                                alt={course.description}
                                fill
                                className="object-cover"
                            />) : null}
                    </div>

                    <CardHeader className="space-y-1">
                        <div>
                            <CardTitle className="text-lg font-semibold">
                                {course.title}
                            </CardTitle>
                            {/* <CardDescription className="mt-2 text-sm">{course.description}</CardDescription> */}
                        </div>
                        <div className="flex items-center justify-between">
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
                                <div className="space-y-1">
                                    <h4 className="text-muted-foreground text-sm">by {course.instructor?.name}</h4>
                                </div>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {!course.modules ? null : (<Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => window.open(course.modules[0]?._ref || '', '_blank')}
                                        >
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                        )}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Course Modules</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                {"price" in course && typeof course.price === "number" && (
                                    <span className="text-lg font-bold text-primary">{
                                        course.price === 0 ? "Free" : `$${course.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                                    }
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center space-x-3">

                                <Button
                                    size="sm"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 "
                                >
                                    Enroll
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    {/* <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs ">
                                <span className="text-muted-foreground">Course Progress</span>
                                <span className="font-medium">{completedLessons}/{totalLessons} lessons</span>
                            </div>
                            <Progress value={progress} className="h-1" />
                        </div>
                    </CardContent> */}
                </Card>
            </Link>
        // </motion.div>
    );
}

