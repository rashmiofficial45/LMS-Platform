"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Author {
    name: string;
    avatar: string;
    role: string;
}

interface CourseCardProps {
    title: string;
    description: string;
    price: string;
    image: string;
    author: Author;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    docsUrl: string;
}

export function CourseCard({
    title,
    description,
    price,
    image,
    author,
    progress,
    totalLessons,
    completedLessons,
    docsUrl
}: CourseCardProps) {
    return (
        <motion.div
            whileHover={{
                scale: 1.02,
                rotateY: 5,
                translateZ: 20
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            className="perspective-1000"
        >
            <Card className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden max-w-sm mx-auto">
                <div className="relative h-40 w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={author.avatar} alt={author.name} />
                                <AvatarFallback>{author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold leading-none">{author.name}</h4>
                                <p className="text-xs text-muted-foreground">{author.role}</p>
                            </div>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => window.open(docsUrl, '_blank')}
                                    >
                                        <FileText className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Course Documentation</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                            {title}
                        </CardTitle>
                        <CardDescription className="mt-2 text-sm">{description}</CardDescription>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Course Progress</span>
                            <span className="font-medium">{completedLessons}/{totalLessons} lessons</span>
                        </div>
                        <Progress value={progress} className="h-1" />
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{totalLessons} Lessons</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-lg font-bold text-primary">{price}</span>
                            <Button
                                size="sm"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform group-hover:translate-x-1"
                            >
                                Enroll
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}