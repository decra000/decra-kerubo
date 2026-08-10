export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { askTeresya, TeresyaOutOfTokensError, type ChatMessage } from "@/lib/teresya";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    if (!messages.length) {
      return NextResponse.json({ error: "Request body must include a non-empty `messages` array." }, { status: 400 });
    }

    // Outer cap, on top of the further trimming lib/teresya.ts does before
    // calling the model, so a pathological request never gets that far.
    const trimmed = messages.slice(-10).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content ?? "").slice(0, 2000),
    })) as ChatMessage[];

    const { text, citations } = await askTeresya(trimmed);
    return NextResponse.json({ reply: text, citations });
  } catch (err) {
    if (err instanceof TeresyaOutOfTokensError) {
      console.warn("[/api/teresya] out of tokens:", err.message);
      return NextResponse.json({ reply: "Out of tokens. Check back later.", outOfTokens: true });
    }
    console.error("[/api/teresya] error:", err);
    return NextResponse.json({ reply: "Something went wrong on Teresya's end. Please try again in a moment.", down: true });
  }
}
