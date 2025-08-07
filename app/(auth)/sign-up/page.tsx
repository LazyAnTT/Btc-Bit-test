"use client";

import { Briefcase, User } from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";

import { SignUpForm } from "@/app/features/auth/sign-up/components/sign-up-form";
import { title } from "@/config/primitives";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center">
          <h1 className={title()}>Sign up</h1>
        </div>
        <Tabs fullWidth aria-label="Account type tabs" variant="underlined">
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
              <CardBody>
                <SignUpForm type="personal" />
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
              <CardBody>
                <SignUpForm type="business" />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
