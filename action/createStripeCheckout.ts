"use server";
import baseUrl from "@/lib/baseUrl";
import stripe from "@/lib/stripe";
import getCourseById from "@/sanity/lib/courses/getCourseById";
import { urlFor } from "@/sanity/lib/image";
import { createEnrollment } from "@/sanity/lib/student/createEnrollment";
import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists";
import { clerkClient } from "@clerk/nextjs/server";

export default async function createStripeCheckout(
  userId: string,
  courseId: string
) {
  //query the course details from sanity
  try {
    const course = await getCourseById(courseId);
//     console.log(course?.price);
//     console.log("Fetching Clerk user for userId:", userId);
// console.log("Fetching course Id:", courseId);

    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);
    const { emailAddresses, firstName, lastName, imageUrl } = clerkUser;
    // console.log("Clerk user data:", { emailAddresses, firstName, lastName, imageUrl });
    const email = emailAddresses?.[0]?.emailAddress;
    if (!email || !emailAddresses) {
      throw new Error("User email not found in Clerk");
    }

    // Ensure course exists
    if (!course) {
      throw new Error("Course not found");
    }

    const user = await createStudentIfNotExists({
      clerkId: userId,
      email,
      firstName: firstName || email,
      lastName: lastName || "",
      imageUrl,
    });

    if (!user) {
      throw new Error("User creation failed");
    }

if (course.price === undefined || course.price === null) {
  throw new Error("Course price is not set");
}

    const priceInCents = Math.round(course.price * 100);

    if (priceInCents === 0) {
      await createEnrollment({
        studentId: userId,
        courseId,
        amount: 0,
        paymentId: "free",
      });
      return { url: `/courses/${course.slug?.current}` };
    }

    const { title, description, image, slug } = course;
    // console.log("Course data:", { title, description, image, slug, price });
    if (!title || !description || !image || !slug) {
      throw new Error("Incomplete course data");
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              description,
              images: [urlFor(image).url() || ""],
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/courses/${slug.current}`,
      cancel_url: `${baseUrl}/courses/${slug.current}?canceled=true`,
      metadata: { courseId: course._id, userId },
    });

    return { url: session.url };
  } catch (error) {
    console.error("Error in createStripeCheckout:", error);
    throw new Error("Failed to create checkout session");
  }
}