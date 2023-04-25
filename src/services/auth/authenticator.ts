import Cookie from "js-cookie";
import { Magic } from "magic-sdk";
import { ResultAsync } from "neverthrow";

const AUTH_COOKIE = "_did";

const client = new Magic(import.meta.env.VITE_AUTH_PUBLIC_KEY);

export function isAuthenticated() {
  return !!Cookie.get(AUTH_COOKIE);
}

export function loginUser(phoneNumber: string): ResultAsync<string | null, unknown> {
  return ResultAsync.fromPromise(client.auth.loginWithSMS({ phoneNumber }).then(writeLoginCookie), (error) => error);
}

function writeLoginCookie(did: string | null) {
  Cookie.set(AUTH_COOKIE, did || ""); // TODO revist this how to handle null
}
