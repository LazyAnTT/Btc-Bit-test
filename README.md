# Next.js & HeroUI Template

# Setup

1) git clone https://github.com/LazyAnTT/Btc-Bit-test.git;
2) bun install;
3) create an .env.local file with:NEXT_PUBLIC_API_BASE_URL="PROVIDED URL";
4) use  script  "setup:hooks": "sh scripts/precommit.sh" before doing commits;
5) bun dev, open http://localhost:3000;

# Usage

  -Sign up under “Personal” or “Business”.
  -Sign in with the matching hard-coded test credentials:
  -Personal → member@valid.email / Member123! (OTP: 151588)
  -Business → partner@valid.email / Partner123! (OTP: 262699)
  -On OTP success, you land on the Balances page. Scroll to load more.
  -Use the search box to filter by currency code/symbol; click column headers to sort.

# Testing

No formal test suite provided. To manually verify:
-Sign-up, then verify redirect behavior.
-Sign-in → OTP → dashboard → sign-out.
-On the balances page, scroll to trigger more pages, test search & sorting.

# Architecture & Design Patterns

  -Provider pattern: wrap app in <Providers> for theme + auth stores
  -Zustand store for auth (simple, unopinionated global state + persistence)
  -React Query for data fetching (caching, background refetch, infinite pagination)
  -Hook abstraction: useSignUpForm, useSignInForm, useCurrencies, useInfiniteBalances
  -Container/Presentational: pages handle data loading; <BalancesTable> purely renders rows
  -CSS-variable theming using Tailwind @layer base + Next-Themes → robust, zero-runtime overhead

# Trade-offs

  -Fake API logic (hard-coded creds & OTP) simplifies demo but isn’t production-grade.
  -Zustand + React Query together add two libraries; combined they cover auth and data layers nicely but increase bundle size.
  -No SSR on balances → fully client-rendered infinite scroll. Could be optimized with React Server Components if needed.
