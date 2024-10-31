// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Set your Stripe secret key in the .env file

// export async function POST(req) {
//   const { totalWithTax } = await req.json();

//   // Create a new Checkout Session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'Booking Payment',
//             // You can add a description or image if needed
//           },
//           unit_amount: Math.round(totalWithTax * 100), // Convert to cents
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`, // Define your success URL
//     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`, // Define your cancel URL
//   });

//   return NextResponse.json({ id: session.id });
// }




// app/api/create-checkout-session/route.js (if using Next.js 13+ with the App Router)




import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // Step 1: Log incoming request
  console.log("Received request to create checkout session.");

  try {
    // Step 2: Parse request body
    const { totalWithTax, bookingId } = await req.json();
    console.log("Parsed request body:", { totalWithTax, bookingId });

    // Step 3: Validate totalWithTax and bookingId
    if (typeof totalWithTax !== 'number') {
      console.error("Invalid totalWithTax:", totalWithTax);
      return new Response(JSON.stringify({ error: "Invalid totalWithTax value" }), { status: 400 });
    }
    if (typeof bookingId !== 'string') {
      console.error("Invalid bookingId:", bookingId);
      return new Response(JSON.stringify({ error: "Invalid bookingId value" }), { status: 400 });
    }

    // Log environment variables for debugging
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log("Base URL for Stripe:", baseUrl);

    // Step 4: Log before creating Stripe session
    const amountInCents = Math.round(totalWithTax * 100);
    console.log("Creating Stripe checkout session with amount (in cents):", amountInCents);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Booking Payment',
            },
            unit_amount: amountInCents, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        bookingId: bookingId,
      },
    });

    // Step 5: Log session creation success
    console.log("Stripe session created successfully:", session);
    
    // Step 6: Return session ID
    return new Response(JSON.stringify({ id: session.id }), { status: 200 });

  } catch (error) {
    // Step 7: Log error details
    console.error("Error creating Stripe checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Webhook handling function
export async function webhook(req) {
  const buf = await req.arrayBuffer();
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, signature, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("Webhook event received:", event);

    // Handle the event (e.g., payment succeeded, etc.)
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Handle successful checkout session (e.g., fulfill order)
        console.log("Checkout session completed:", session);
        break;
      // Add more event types as needed
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (err) {
    console.error(`Error processing webhook: ${err.message}`);
    return new Response(JSON.stringify({ error: "Webhook error" }), { status: 400 });
  }
}
