import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AccountType = "personal" | "business";
export type User = { id: string; email: string; accountType: AccountType };

interface AuthState {
  user: User | null;
  pending: Omit<User, "id"> | null;
  loading: boolean;
  loginWithCreds: (
    email: string,
    password: string,
    accountType: AccountType,
  ) => boolean;
  verifyOtp: (otp: string) => boolean;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      pending: null,
      loading: false,

      loginWithCreds(email, password, accountType) {
        const valid =
          (accountType === "personal" &&
            email === "member@valid.email" &&
            password === "Member123!") ||
          (accountType === "business" &&
            email === "partner@valid.email" &&
            password === "Partner123!");

        if (!valid) return false;
        set({ pending: { email, accountType } });

        return true;
      },

      verifyOtp(otp) {
        const p = get().pending;

        if (!p) return false;

        const codes: Record<AccountType, string> = {
          personal: "151588",
          business: "262699",
        };

        if (otp !== codes[p.accountType]) return false;

        const u: User = { id: "1", ...p };

        set({ user: u, pending: null });

        return true;
      },

      signOut() {
        set({ user: null, pending: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
