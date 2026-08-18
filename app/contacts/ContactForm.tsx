"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/Button";
import { CONTACT_FORM_ENDPOINT, SITE } from "@/lib/config";

// Logica di invio isolata: se CONTACT_FORM_ENDPOINT è impostato, invia a un servizio
// no-code (es. Formspree). Altrimenti apre il client email dell'utente con mailto:.
async function submitContactForm(data: { name: string; email: string; message: string }) {
  if (CONTACT_FORM_ENDPOINT) {
    const res = await fetch(CONTACT_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Sending failed");
    return { method: "endpoint" as const };
  }

  const subject = encodeURIComponent(`Messaggio da ${data.name} — sito BMLA`);
  const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  return { method: "mailto" as const };
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContactForm(values);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="block text-xs uppercase tracking-wide text-ink-faint">
          Name
        </label>
        <input
          id="name"
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className="mt-2 w-full rounded border border-border bg-bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs uppercase tracking-wide text-ink-faint">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className="mt-2 w-full rounded border border-border bg-bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent"
          placeholder="John.Doe@campus.unimib.it"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-wide text-ink-faint">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="mt-2 w-full resize-none rounded border border-border bg-bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent"
          placeholder="Write your message here..."
        />
      </div>

      <Button type="submit" variant="solid" className="w-full sm:w-fit">
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>

      {status === "sent" && (
        <p className="text-sm text-accent">
          {CONTACT_FORM_ENDPOINT ? "Message sent. We’ll get back to you soon." : "Your email client has been opened. Complete the message from there."}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please try again or email us directly.</p>
      )}
    </form>
  );
}
