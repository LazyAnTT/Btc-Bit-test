"use client";

import { Briefcase, User } from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SignInForm } from "@/app/features/auth/sign-in/components/sign-in-form";
import { title } from "@/config/primitives";

export default function SignInPage() {
  const params = useSearchParams();
  const incoming = params.get("type") as "personal" | "business" | null;
  const [selected, setSelected] = useState<"personal" | "business">(
    incoming ?? "personal",
  );

  useEffect(() => {
    if (incoming) setSelected(incoming);
  }, [incoming]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center">
          <h1 className={title()}>Sign in</h1>
        </div>

        <Tabs
          fullWidth
          aria-label="Account type tabs"
          selectedKey={selected}
          variant="underlined"
        >
          <Tab
            key="personal"
            title={
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Personal</span>
              </div>
            }
          >
            <Card>
              <CardBody className="p-6">
                <SignInForm type="personal" />
              </CardBody>
            </Card>
          </Tab>

          <Tab
            key="business"
            title={
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <span>Business</span>
              </div>
            }
          >
            <Card>
              <CardBody className="p-6">
                <SignInForm type="business" />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
