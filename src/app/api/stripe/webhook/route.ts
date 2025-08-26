import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStudentByClerkId } from "@/sanity/lib/student/getStudentByClerkId";
import { createEnrollment } from "@/sanity/lib/student/createEnrollment";
import stripe from "@/lib/stripe";

// Ensure this route runs on the Node.js runtime (required for Stripe SDK)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new NextResponse("No signature found", { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Webhook signature verification failed: ${errorMessage}`);

      return new NextResponse(`Webhook Error: ${errorMessage}`, {
        status: 400,
      });
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get the courseId and userId from the metadata
      const courseId = session.metadata?.courseId;
      const userId = session.metadata?.userId;
      console.log("courseId:", courseId);
      console.log("userId:", userId);
      if (!courseId || !userId) {
        return new NextResponse("Missing metadata", { status: 404 });
      }

      const student = await getStudentByClerkId(userId);

      if (!student) {
        return new NextResponse("Student not found", { status: 400 });
      }

      // Create an enrollment record in Sanity
      await createEnrollment({
        studentId: student._id,
        courseId,
        paymentId: session.id,
        amount: session.amount_total! / 100, // Convert from cents to dollars
      });
      console.log("📦 Stripe Event:", JSON.stringify(event, null, 2));
      return new NextResponse(null, { status: 200 });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error in webhook handler:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Webhook handler failed: ${message}` as any, {
      status: 500,
    });
  }
}
