import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.text(); // Get raw body for signature verification
  const signature = req.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const { registration_id } = event.data.metadata;
    const reference = event.data.reference;
    const amount = event.data.amount / 100;

    // Update Supabase to Completed
    const { error } = await supabase
      .from('future_force_registrations')
      .update({ 
        payment_status: 'completed',
        paystack_reference: reference,
        amount_paid: amount
      })
      .eq('id', registration_id);

    if (error) console.error("Webhook DB Update Error:", error);
    
    // Note: We will trigger EmailJS logic from here or the Success page
  }

  return NextResponse.json({ received: true }, { status: 200 });
}