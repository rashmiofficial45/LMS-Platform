import getCourseBySlug from '@/sanity/lib/courses/getCoursesBySlug';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

interface CoursePageProps {
    params: Promise<{
        slug: string;
    }>;
}

const CoursePage = async({ params }: CoursePageProps) => {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);
    const { userId } = await auth();
if (!course){
    return <div>Course not found</div>
}
    return <div>CoursePage: {slug}</div>;
};


export default CoursePage