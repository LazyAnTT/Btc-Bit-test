"use client";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { User, LogOut } from "lucide-react";

import { useAuthStore } from "@/app/features/auth/store/auth-store";
import { navMenuItems } from "@/components/navigation-bar/constants";
import { ThemeSwitch } from "@/components/theme";
import { Logo } from "@/components/icons";

export const NavigationBar = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuthStore();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center gap-1" href="/">
            <Logo />
            <span className="font-bold">Btc Bit</span>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 ml-6">
          {navMenuItems.map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <NavbarItem key={href}>
                <NextLink
                  className={clsx(
                    "hover:text-primary transition-colors font-medium",
                    { "text-primary": isActive, "text-foreground": !isActive },
                  )}
                  href={href}
                >
                  {label}
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex items-center gap-4"
        justify="end"
      >
        <ThemeSwitch />

        {!user ? (
          <>
            <Button as={Link} href="/sign-in" size="sm" variant="flat">
              Sign In
            </Button>
            <Button as={Link} href="/sign-up" size="sm" variant="solid">
              Sign Up
            </Button>
          </>
        ) : (
          <Dropdown>
            <DropdownTrigger>
              <Button className="p-2" variant="ghost">
                <User className="h-5 w-5" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem key="sign-out" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="flex flex-col gap-2 p-4 mt-10">
          {navMenuItems.map(({ href, label }) => (
            <NavbarMenuItem key={href}>
              <NextLink className="block w-full py-2" href={href}>
                {label}
              </NextLink>
            </NavbarMenuItem>
          ))}

          {user && (
            <>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
