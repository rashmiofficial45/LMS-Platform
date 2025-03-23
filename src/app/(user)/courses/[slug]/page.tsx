import React from 'react'

interface CoursePageProps {
    params: {
        slug: string;
    };
}

const CoursePage = ({ params }: CoursePageProps) => {
    const { slug } = params;
    return <div>CoursePage: {slug}</div>;
};


export default CoursePage