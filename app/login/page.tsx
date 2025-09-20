"use client";
import { useEffect } from "react";
import { authClient } from "@/lib/auth/client";

export default function LoginPage() {
  const { data } = authClient.useSession();

  useEffect(() => {
    const email = data?.user?.email ?? "";
    if (!email) return;
    if (!email.endsWith("@wayne.edu")) {
      alert("Please enter your Wayne State email (@wayne.edu).");
      authClient.signOut();
      return;
    }
    
  }, [data]);

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-56px)] max-w-[420px] items-center justify-center px-4">
      <div className="w-full">
        {  }
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Sign in with your credentials
          </h1>
        </div>

        { }
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#319795] focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#319795] focus:outline-none"
          />

          { }
          <button
            type="submit"
            className="w-full rounded-full bg-[#319795] py-3 text-sm font-medium text-white hover:bg-[#27736f]"
          >
            Sign In
          </button>
        </form>

        { }
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-[#319795] hover:underline">
            Forgot password?
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          * Please use your <b>@wayne.edu</b> email to sign in.
        </p>
      </div>
    </div>
  );
}