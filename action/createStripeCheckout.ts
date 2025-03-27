"use server";

import baseUrl from "@/lib/baseUrl";
import stripe from "@/lib/stripe";
import getCourseById from "@/sanity/lib/courses/getCourseById";

export default async function createStripeCheckout(userId:string, courseId:string){
    //query the course details from sanity
    const course = await getCourseById(courseId)
}