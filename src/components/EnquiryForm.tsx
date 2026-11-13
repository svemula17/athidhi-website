"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { button, field } from "@/components/ui";
import { site } from "@/data/site";

type Values = Record<string, string>;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={field.label}>{label}</span>
      {children}
    </label>
  );
}

/**
 * Banquet / catering enquiry. Like the original site, submitting opens WhatsApp with the
 * details filled in, addressed to the restaurant's number (site.whatsapp).
 */
export default function EnquiryForm({ kind }: { kind: "banquet" | "catering" }) {
  const [values, setValues] = useState<Values>({});
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const label = kind === "banquet" ? "Banquet" : "Catering";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data: Values = Object.fromEntries(
      [...new FormData(event.currentTarget).entries()].map(([key, value]) => [key, String(value).trim()]),
    );
    const message = [
      `*${label} Request — Athidhi*`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Event date: ${data.date}`,
      data.time && `Time: ${data.time}`,
      data.guests && `Guests: ${data.guests}`,
      data.details && `Details: ${data.details}`,
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
    setValues(data);
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (whatsappUrl) {
    return (
      <div role="status" className="rounded-3xl border border-gold/30 bg-white p-8 text-center shadow-sm sm:p-12">
        <h3 className="font-serif text-3xl text-maroon">Almost done</h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink/70">
          Your {label.toLowerCase()} request is ready in WhatsApp. Press send there and we’ll contact you to finalize
          the arrangements.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={button.maroon}>
            Open WhatsApp again
          </a>
          <button
            type="button"
            onClick={() => setWhatsappUrl(null)}
            className="text-sm font-semibold text-maroon underline-offset-4 hover:underline"
          >
            Edit request
          </button>
        </div>
        <p className="mt-8 text-sm text-ink/60">
          Prefer to call?{" "}
          <a href={site.phoneHref} className="font-semibold text-maroon">
            {site.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-maroon/10 bg-white p-6 shadow-sm sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name *">
          <input name="name" required autoComplete="name" placeholder="John Doe" defaultValue={values.name} className={field.input} />
        </Field>
        <Field label="Email *">
          <input type="email" name="email" required autoComplete="email" placeholder="john@example.com" defaultValue={values.email} className={field.input} />
        </Field>
        <Field label="Phone Number *">
          <input type="tel" name="phone" required autoComplete="tel" placeholder="+1 (609) 000-0000" defaultValue={values.phone} className={field.input} />
        </Field>
        <Field label="Event Date *">
          <input type="date" name="date" required defaultValue={values.date} className={field.input} />
        </Field>
        <Field label="Time">
          <input type="time" name="time" defaultValue={values.time} className={field.input} />
        </Field>
        <Field label="No. of Guests">
          <input type="number" name="guests" min={1} inputMode="numeric" placeholder="e.g. 50" defaultValue={values.guests} className={field.input} />
        </Field>
      </div>
      <Field label="Event Details & Questions">
        <textarea
          name="details"
          rows={5}
          placeholder="Tell us about the event (Birthday, Anniversary, Wedding) and any specific requirements..."
          defaultValue={values.details}
          className={`${field.input} resize-y`}
        />
      </Field>
      <button type="submit" className={`${button.maroon} w-full`}>
        Submit {label} Request
      </button>
      <p className="text-center text-xs text-ink/60">Submitting opens WhatsApp with your details filled in, ready to send to Athidhi.</p>
    </form>
  );
}
