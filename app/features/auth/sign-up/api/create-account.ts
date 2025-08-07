export type CreateUserParams = {
  email: string;
  password: string;
  accountType: "personal" | "business";
};

/**
 * Fake out the network call so we always succeed,
 * even if the real MockAPI is returning 400.
 */
export async function createAccount(params: CreateUserParams) {
  await new Promise((r) => setTimeout(r, 500));

  return {
    id: Math.random().toString(36).slice(2), // random id
    ...params,
  };
}
