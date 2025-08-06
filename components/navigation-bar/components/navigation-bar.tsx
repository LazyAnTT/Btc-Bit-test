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
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import {
  navMenuItems,
  externalLinks,
} from "@/components/navigation-bar/constants";
import { ThemeSwitch } from "@/components/theme";
import { Github, Logo, HeartFilled, Search } from "@/components/icons";

export const NavigationBar = () => {
  const pathname = usePathname();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{ inputWrapper: "bg-default-100", input: "text-sm" }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <Search className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center gap-1" href="/">
            <Logo />
            <p className="font-bold">ACME</p>
          </NextLink>
        </NavbarBrand>

        <ul className="hidden lg:flex gap-4 ml-2">
          {navMenuItems.map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <NavbarItem key={href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: isActive ? "primary" : "foreground" }),
                    "hover:text-primary font-medium transition-colors",
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

      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={externalLinks.github}>
            <Github className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={externalLinks.sponsor}
            startContent={<HeartFilled className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden pl-4" justify="end">
        <Link isExternal aria-label="Github" href={externalLinks.github}>
          <Github className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navMenuItems.map((item, i) => (
            <NavbarMenuItem key={item.href}>
              <Link
                color={
                  i === 2
                    ? "primary"
                    : i === navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
