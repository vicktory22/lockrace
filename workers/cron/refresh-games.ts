import { HttpResponses } from "../../src/services/http-responses/http-responses";
import { fromPromise } from "../../src/services/result";

type Env = {
  GAMES_URL: string,
  DB_HOST: string,
  DB_USERNAME: string,
  DB_PASSWORD: string,
}

const handler: ExportedHandler<Env> = {
  async fetch(_request, env: Env, _ctx) {
    const gamesResponse = await fromPromise(fetch(env.GAMES_URL).then((res) => res.json()));

    if (gamesResponse.isErr()) {
      return HttpResponses.internalServerError('Unable to fetch games.');
    }

    return HttpResponses.ok(JSON.stringify(gamesResponse.unwrap()));
  },
};

export default handler;
