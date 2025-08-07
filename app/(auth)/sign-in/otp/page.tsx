// app/sign-in/otp/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";

import { useAuthStore } from "@/app/features/auth/store/auth-store";
import { title } from "@/config/primitives";

export default function OtpPage() {
  const router = useRouter();
  const params = useSearchParams();
  const type = (params.get("type") as "personal" | "business") || "personal";
  const verifyOtp = useAuthStore((s) => s.verifyOtp);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // simulate network delay
    setTimeout(() => {
      if (verifyOtp(otp)) {
        toast.success("Welcome back!");
        router.push("/balances");
      } else {
        setError("Wrong code, try again.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center">
          <h1 className={title()}>
            Verify {type === "personal" ? "Personal" : "Business"} OTP
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <form className="space-y-4" onSubmit={handleVerify}>
            <p className="text-default-500 text-sm">Enter your 6-digit code</p>
            <InputOtp
              aria-label="One-time passcode"
              disabled={loading}
              length={6}
              value={otp}
              onValueChange={setOtp}
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button
              className="w-full"
              color="primary"
              disabled={loading || otp.length < 6}
              isLoading={loading}
              type="submit"
            >
              Verify
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
