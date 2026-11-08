"use client";

import { useState, type FormEvent } from "react";
import { button, field } from "@/components/ui";

// Accounts aren't wired to a backend yet; submitting just says so.
export default function SignInForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className={field.label}>Email</span>
        <input type="email" name="email" required autoComplete="email" placeholder="you@example.com" className={field.input} />
      </label>
      <label className="block">
        <span className={field.label}>Password</span>
        <input type="password" name="password" required autoComplete="current-password" placeholder="••••••••" className={field.input} />
      </label>
      <button type="submit" className={`${button.maroon} w-full`}>
        Sign In
      </button>
      {submitted && (
        <p role="status" className="rounded-xl bg-sand px-4 py-3 text-center text-sm text-ink/70">
          Online accounts aren’t connected yet.
        </p>
      )}
    </form>
  );
}
