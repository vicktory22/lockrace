import Cookie from "js-cookie";

const AUTH_COOKIE = "_did";

export function isAuthenticated() {
  return !!Cookie.get(AUTH_COOKIE);
}
