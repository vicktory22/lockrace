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
    const host = env.GAMES_URL;
    
    const gamesResponse = await fromPromise(fetch(host).then((res) => res.json()));

    if (gamesResponse.isErr()) {
      return HttpResponses.internalServerError('Unable to fetch games.');
    }

    // id,
    // home_team_id,
    // await_team_id
    // game_time
    // home_odds
    // away_odds
    // home_score
    // away_score
    

    return HttpResponses.ok(JSON.stringify(gamesResponse.unwrap()));
  },
};

export default handler;
