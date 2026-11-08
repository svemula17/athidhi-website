import type { Metadata } from "next";
import Image from "next/image";
import SignInForm from "@/components/SignInForm";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Sign In — Athidhi",
};

export default function AuthPage() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-sand px-4 py-20">
      <div className="w-full max-w-md rounded-3xl border border-maroon/10 bg-white p-8 shadow-xl shadow-ink/5 sm:p-12">
        <div className="text-center">
          <Image src={asset("/assets/logo-BgkjBRVm.png")} alt="Athidhi" width={577} height={433} className="mx-auto h-20 w-auto" />
          <h1 className="mt-6 font-serif text-3xl text-maroon">Welcome back</h1>
          <p className="mt-2 text-sm text-ink/60">Sign in to your Athidhi account</p>
        </div>
        <div className="mt-8">
          <SignInForm />
        </div>
      </div>
    </section>
  );
}
