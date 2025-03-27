"use server";
import baseUrl from "@/lib/baseUrl";
import stripe from "@/lib/stripe";
import getCourseById from "@/sanity/lib/courses/getCourseById";
import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists";
import { clerkClient } from "@clerk/nextjs/server";

export default async function createStripeCheckout(
  userId: string,
  courseId: string
) {
  //query the course details from sanity
  const course = await getCourseById(courseId);
  const clerkUser = await (await clerkClient()).users.getUser(userId);
  const { emailAddresses, firstName, lastName, imageUrl } = clerkUser;
  const email = emailAddresses[0]?.emailAddress;
  if (!course) {
    throw new Error("Course not found ");
  }
  if (!email) {
    throw new Error("User email not found");
  }
  const user = await createStudentIfNotExists({
    clerkId: userId,
    email: email || "",
    firstName: firstName || email,
    lastName: lastName || "",
    imageUrl,
  });
  if (!user) {
    throw new Error("User not found");
  }

  
}
