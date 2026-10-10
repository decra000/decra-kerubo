"use client";
import { useCallback, useRef, useState } from "react";

// Minimal ambient typing for the Web Speech API — not yet in TS's default DOM lib.
interface SpeechRecognitionResultLike { transcript: string }
interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((ev: { results: { [i: number]: { [j: number]: SpeechRecognitionResultLike } } }) => void) | null;
  onend: (() => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
}
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

/**
 * Voice interaction for the AI chat widgets — speech-to-text for input,
 * text-to-speech for replies. Both rely entirely on the browser's built-in
 * Web Speech API (no external service, no API key), so support varies:
 * recognition works in Chrome/Edge/Safari but not Firefox; synthesis is
 * broadly supported. Callers should check `supported`/`synthSupported`
 * before showing the relevant controls.
 */
export function useSpeech() {
  const [listening, setListening] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const supported = typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const synthSupported = typeof window !== "undefined" && !!window.speechSynthesis;

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const listen = useCallback((onResult: (text: string) => void) => {
    if (!supported || listening) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    setSpeechError("");
    // Use a widely supported recognition locale. The browser can still
    // recognize Kenyan accents without requiring a less commonly installed
    // en-KE model.
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const text = e.results[0]?.[0]?.transcript;
      if (text?.trim()) onResult(text.trim());
      else setSpeechError("I didn't catch that. Please try again or type your message.");
    };
    rec.onend = () => setListening(false);
    rec.onerror = (event) => {
      setListening(false);
      const messages: Record<string, string> = {
        "not-allowed": "Microphone access is blocked. Allow it in your browser's site settings, then try again.",
        "service-not-allowed": "Browser speech recognition is unavailable. Check your browser settings or type your message.",
        network: "Speech recognition could not connect. Check your connection or type your message.",
        "audio-capture": "No microphone was detected. Check your microphone connection and permissions.",
        "no-speech": "I didn't hear speech. Please try again or type your message.",
        aborted: "Voice input was stopped. You can try again whenever you're ready.",
      };
      setSpeechError(messages[event.error || ""] || "Voice input failed. Please try again or type your message.");
    };
    recognitionRef.current = rec;
    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
      setSpeechError("The microphone could not start. Check browser permission and try again.");
    }
  }, [supported, listening]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (!synthSupported || !text) return;
    window.speechSynthesis.cancel();
    // Strip basic markdown/symbols that would otherwise be read aloud literally.
    const clean = text.replace(/[*_#`]/g, "");
    const utter = new SpeechSynthesisUtterance(clean);
    utter.rate = 1.02;
    utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, [synthSupported]);

  return { listen, stopListening, listening, supported, speechError, speak, stopSpeaking, speaking, synthSupported };
}
