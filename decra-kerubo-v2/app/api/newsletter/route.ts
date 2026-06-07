export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    const db = supabaseAdmin();

    const { error } = await db
      .from("subscribers")
      .upsert({ email, name }, { onConflict: "email" });

    if (error) throw error;

    // Send guide email
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Decra Kerubo <${process.env.EMAIL_FROM}>`,
        to: [email],
        subject: "Your AI Readiness Guide is here",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
            <h1 style="color: #0F4D3F;">Your guide is attached.</h1>
            <p>Hi ${name || "there"},</p>
            <p>Thank you for downloading the <strong>AI Readiness Guide for Startups & NGOs</strong>.</p>
            <p>The guide covers: what AI readiness actually means, how to assess your current state, common mistakes in AI adoption, and a practical framework for getting started.</p>
            <p>If you have questions after reading, just reply to this email.</p>
            <p style="margin-top: 40px;">— Decra Kerubo</p>
          </div>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
