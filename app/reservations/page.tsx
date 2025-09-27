"use client";
import { useEffect } from "react";
import { authClient } from "@/lib/auth/client";
import Image from "next/image";

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

    console.log(data, "User email:", email);

  }, [data]);

  return (
    <div className="w-full min-h-[calc(100dvh-56px)] flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-[420px]">
        reservations
      </div>
    </div>
  );
}