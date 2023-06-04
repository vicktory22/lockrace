import { fetchGames } from "../../src/services/games/games";
import { HttpResponses } from "../../src/services/http-responses/http-responses";

export const onRequestGet: PagesFunction = async function () {
  const fetchGamesResult = await fetchGames();

  if (fetchGamesResult.isErr()) {
    return HttpResponses.internalServerError("Unable to fetch games");
  }

  const games = fetchGamesResult.unwrap();

  // return HttpResponses.ok(JSON.stringify(games));
  const gameSQL: string[] = [];

  for (const event of games.events) {
    const [{ team: homeTeam }, { team: awayTeam }] = event.competitions[0].competitors;

    gameSQL.push(
      `INSERT INTO teams (id, name, abbreviation, display_name, logo_url) VALUES (${parseInt(homeTeam.id)}, '${
        homeTeam.name
      }', '${homeTeam.abbreviation}', '${homeTeam.displayName}', '${homeTeam.logo}')`,
    );
    gameSQL.push(
      `INSERT INTO teams (id, name, abbreviation, display_name, logo_url) VALUES (${parseInt(awayTeam.id)}, '${
        awayTeam.name
      }', '${awayTeam.abbreviation}', '${awayTeam.displayName}', '${awayTeam.logo}')`,
    );
  }

  return HttpResponses.ok(JSON.stringify(gameSQL.join(";")));
  // CREATE TABLE `lockrace`.`games` (`id` int NOT NULL,`home_team_id` int NOT NULL,`away_team_id` int NOT NULL,`game_time` datetime NOT NULL,`home_odds` float DEFAULT NULL,`home_score` int DEFAULT NULL,`away_score` int DEFAULT NULL, PRIMARY KEY (id));
};
