"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const path = usePathname();

  const onSignInPage = path?.endsWith("/sign-in");
  const other = onSignInPage
    ? { href: "/sign-up", label: "Sign Up" }
    : { href: "/sign-in", label: "Sign In" };

  return (
    <div className="flex flex-col">
      <header className="flex justify-end p-4">
        <Link
          className="text-sm font-medium text-default-600 hover:text-primary"
          href={other.href}
        >
          {other.label}
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
