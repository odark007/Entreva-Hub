import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amount, program_slug } = body;

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Convert GHS to Pesewas
        currency: "GHS",
        // This is where Paystack sends the user AFTER payment
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/programmes/future-force/success`,
        metadata: {
          program_slug,
          custom_fields: [
            {
              display_name: "Program",
              variable_name: "program",
              value: program_slug
            }
          ]
        },
      }),
    });

    const data = await response.json();
    if (!data.status) return NextResponse.json({ error: data.message }, { status: 400 });

    return NextResponse.json({ url: data.data.authorization_url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}