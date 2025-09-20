"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [step, setStep] = useState<1 | 2>(1);
  const router = useRouter();

useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2000); // 2s
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-[calc(100dvh-56px)]">
      {step === 1 ? (
        <div
          className="flex h-full items-center justify-center text-white"
          style={{ background: "linear-gradient(180deg,#4FD1C5,#319795)" }}
        >
          <div className="flex flex-col items-center gap-6">
            <Image src="/Logoonboarding.svg" alt="StudyRez" width={64} height={0} style={{ height: "auto" }} priority />
            <h1 className="text-3xl font-bold">StudyRez</h1>
            <p className="max-w-[280px] text-center text-white/90 text-base">
              Reserve your study space, anywhere.
            </p>
          </div>
        </div>
      ) : (
        

        <div className="mx-auto h-full w-full max-w-[420px] px-4 py-8">
          <Image src="/Logologin.svg" alt="StudyRez" width={48} height={0} style={{ height: "auto" }} priority />
          <h1 className="text-xl font-semibold text-gray-900 text-center">
            Select your school
          </h1>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              defaultValue="Wayne State University"
              placeholder="Search schools"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#319795] focus:outline-none"
            />

            <button
              onClick={() => router.push("/login")}
              className="w-full rounded-full bg-[#319795] py-3 text-sm font-medium text-white hover:bg-[#27736f]"
            >
              Continue
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            You will sign in with your Wayne State email (@wayne.edu).
                </p>
        </div>
      )}
    </div>
  );
}

