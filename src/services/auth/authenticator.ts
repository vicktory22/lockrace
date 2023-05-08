import Clerk from "@clerk/clerk-js";

export type SignInProps = {
  afterSignInUrl?: string;
};

export type AuthClient = {
  isAuthenticated: () => boolean;
  token: () => Promise<string | null | undefined>;
  user: Clerk["user"];
  client: Clerk["client"];
  openSignIn: (props: SignInProps) => void;
};

export async function AuthClient(): Promise<AuthClient> {
  const authClient = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  await authClient.load();

  return {
    isAuthenticated: () => authClient.session?.status === "active",
    token: async () => authClient.session?.getToken(),
    user: authClient.user,
    client: authClient.client,
    openSignIn: () => authClient.openSignIn(),
  };
}
