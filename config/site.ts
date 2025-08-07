export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Currency Dashboard",
  description: "Track balances and currencies across accounts.",
  navItems: [
    {
      label: "Home",
      href: "/balances",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/balances",
    },
  ],
  links: {
    github: "https://github.com/your-username/your-repo", // Optional
    docs: "https://heroui.com",
  },
};
