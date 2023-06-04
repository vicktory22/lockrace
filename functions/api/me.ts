import { validateToken } from "../../src/services/auth/validator";
import { getTokenFromRequest } from "../../src/services/cookies/cookie";
import { HttpResponses } from "../../src/services/http-responses/http-responses";

type Env = {
  AUTH_SECRET_KEY: string;
  AUTH_PUBLIC_PEM_KEY: string;
};

export const onRequestGet: PagesFunction<Env> = async function (context) {
  const { request, env } = context;

  const getTokenResult = getTokenFromRequest(request);

  if (getTokenResult.isErr()) {
    return HttpResponses.badRequest(getTokenResult.unwrapErr());
  }

  const token = getTokenResult.unwrap();

  const validateTokenResult = await validateToken(token, env.AUTH_PUBLIC_PEM_KEY);

  return validateTokenResult.match({
    ok: (userId) => HttpResponses.ok(JSON.stringify({ userId })),
    err: (err) => HttpResponses.unauthorized(err),
  });
};
