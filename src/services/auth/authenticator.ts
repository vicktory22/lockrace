import Cookie from "js-cookie";
import { Magic } from "magic-sdk";
import { ResultAsync } from "neverthrow";

const AUTH_COOKIE = "_did";

const client = getClient();

export function isAuthenticated() {
  return !!Cookie.get(AUTH_COOKIE);
}

export function loginUser(phoneNumber: string): ResultAsync<string | void | null, unknown> {
  return ResultAsync.fromPromise(client.auth.loginWithSMS({ phoneNumber }).then(writeLoginCookie), (error) => error);
}

function writeLoginCookie(did: string | null) {
  Cookie.set(AUTH_COOKIE, did || ""); // TODO revist this how to handle null
}

function getClient() {
  if (import.meta.env.MODE === "test") {
    return {
      auth: {
        loginWithSMS: async ({ phoneNumber: _ }: { phoneNumber: string }) => {
          return Promise.resolve("did:ethr:0x1234567890123456789012345678901234567890");
        },
      },
    };
  }

  return new Magic(import.meta.env.VITE_AUTH_PUBLIC_KEY);
}
