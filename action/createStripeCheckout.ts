"use server";
import baseUrl from "@/lib/baseUrl";
import stripe from "@/lib/stripe";
import getCourseById from "@/sanity/lib/courses/getCourseById";
import { createEnrollment } from "@/sanity/lib/student/createEnrollment";
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

  // 2. Validate course data and prepare price for Stripe
  if (!course.price || course.price !== 0) {
    throw new Error("Course price is not set");
  }
  const priceInCents = Math.round(course.price * 100);
  // if course is free, create enrollment and redirect to course page (BYPASS STRIPE CHECKOUT)
  if (priceInCents === 0) {
    await createEnrollment({
      studentId: userId,
      courseId: courseId,
      amount: 0,
      paymentId: "free",
    });
    return {
      url: `/courses/${course.slug?.current}`,
    };
  }
  const { title, description, image, slug } = course;

  if (!title || !description || !image || !slug) {
    throw new Error("Course data is incomplete");
  }
}
