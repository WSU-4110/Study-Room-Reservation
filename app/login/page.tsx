// app/login/page.tsx
"use client";

import { useState } from "react";

type University = { id: string; name: string; domain: string };

const UNIVERSITIES: University[] = [
  { id: "wayne", name: "Wayne State University", domain: "wayne.edu" },
  // Add more universities here if needed
];

export default function LoginPage() {
  const [universityId, setUniversityId] = useState<string>("wayne");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedUni = UNIVERSITIES.find((u) => u.id === universityId)!;

  function isValidEmail(value: string) {
    return /^\S+@\S+\.\S+$/.test(value);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!isValidEmail(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }
    const lower = email.toLowerCase().trim();
    const requiredDomain = "@" + selectedUni.domain;
    if (!lower.endsWith(requiredDomain)) {
      setMsg(`Please use your ${selectedUni.name} email (e.g., accessid${requiredDomain}).`);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ universityId, email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Sign-in failed. Please check your email or try again.");
      }
      // On success → redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-semibold">Study Room — Login</h1>
        <p className="mb-6 text-sm text-gray-500">
          Select your university and sign in with your Wayne State email to view & reserve rooms.
        </p>

        {msg && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {msg}
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          <label className="grid gap-2">
            <span className="text-sm">University</span>
            <select
              className="rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:ring"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              aria-label="Select university"
            >
              {UNIVERSITIES.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500">
              Required email domain: @{selectedUni.domain}
            </span>
          </label>

          <label className="grid gap-2">
            <span className="text-sm">Wayne State Email</span>
            <input
              type="email"
              placeholder="accessid@wayne.edu"
              className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Continue"}
          </button>

          <p className="text-xs text-gray-500">
            By continuing you agree to the Terms & Privacy.
          </p>
        </form>
      </div>
    </main>
  );
}
