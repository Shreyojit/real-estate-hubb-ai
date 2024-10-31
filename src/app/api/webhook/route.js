// // app/api/webhook/route.js (if using Next.js 13+ with the App Router)

// import { buffer } from 'micro';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, we will use buffer
//   },
// };

// export async function POST(req) {
//   const buf = await buffer(req);
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error(`Webhook signature verification failed: ${err.message}`);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const session = event.data.object;

//       // Retrieve bookingId from session metadata
//       const bookingId = session.metadata.bookingId;

//       // Log payment and booking information
//       console.log(`Payment for booking ID ${bookingId} was successful!`);
//       console.log(`Session details:`, session);

//       // TODO: Update your booking status in your data store here (if applicable)

//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   return new Response(JSON.stringify({ received: true }), { status: 200 });
// }




// import { buffer } from 'micro';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Set up the handler function for POST requests
// export async function POST(req) {
//   const buf = await buffer(req);
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error(`Webhook signature verification failed: ${err.message}`);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const session = event.data.object;

//       // Retrieve bookingId from session metadata
//       const bookingId = session.metadata.bookingId;

//       // Log payment and booking information
//       console.log(`Payment for booking ID ${bookingId} was successful!`);
//       console.log(`Session details:`, session);

//       // TODO: Update your booking status in your data store here (if applicable)

//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   return new Response(JSON.stringify({ received: true }), { status: 200 });
// }

// // Middleware to handle body parsing
// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, we will use buffer
//   },
// };
