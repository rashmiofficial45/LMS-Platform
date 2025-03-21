// import { getSearchResults } from '@/lib/search'

import { searchCourses } from "@/sanity/lib/courses/searchCourses"
import { redirect } from "next/navigation"

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const term = (await searchParams).term
    if (!term || typeof term !== "string") {
        return redirect("/")
    }
    const decodedTerm = decodeURIComponent(term)
    const courses = await searchCourses(decodedTerm)
    console.log(courses)
    return <div>{courses.map(course => <div key={course._id}>{course.title}</div>)}</div>
}