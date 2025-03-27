import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key not found.");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});
export default stripe;
