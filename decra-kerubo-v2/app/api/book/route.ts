export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, email, organization, website, industry, team_size,
      primary_challenge, desired_outcome, consultation_type, scheduled_at,
    } = body;

    const db = supabaseAdmin();

    // Store booking in Supabase
    const { data: booking, error } = await db
      .from("bookings")
      .insert({
        name, email, organization, website, industry, team_size,
        primary_challenge, desired_outcome, consultation_type,
        scheduled_at, status: "confirmed",
      })
      .select()
      .single();

    if (error) throw error;

    // Store as lead
    await db.from("leads").insert({
      name, email, organization, source: "booking",
    });

    // Send confirmation email via Resend
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: `Decra Kerubo <${process.env.EMAIL_FROM}>`,
          to: [email],
          subject: `Consultation confirmed — ${consultation_type}`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
              <h1 style="color: #0F4D3F; font-size: 28px;">Your consultation is confirmed.</h1>
              <p>Hi ${name},</p>
              <p>Your <strong>${consultation_type}</strong> consultation has been confirmed.</p>
              <p><strong>Date:</strong> ${scheduled_at}</p>
              <p>I'll send a Google Meet link shortly. In the meantime, feel free to reply to this email with any questions.</p>
              <p style="margin-top: 40px;">— Decra Kerubo</p>
            </div>
          `,
        }),
      });
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    return NextResponse.json({ success: true, booking, meet_link: null });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
