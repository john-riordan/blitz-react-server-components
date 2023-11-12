export function leagueMatchlist({ region, puuid }) {
  return `https://riot.iesdev.com/graphql?query=query+LeagueMatchlist%28%24region%3ARegion%21%2C%24puuid%3AID%21%29%7Bmatchlist%28region%3A%24region%2Cpuuid%3A%24puuid%29%7Bmatches%7Bid+playerMatch%7Bid+playerMatchStats%7Blp+deltaLp+kills+deaths+assists%7D%7D%7D%7D%7D&variables=%7B%22region%22%3A%22${region.toUpperCase()}%22%2C%22puuid%22%3A%22${puuid}%22%7D`;
}

export function leagueMatch({ region, matchId }) {
  return `https://riot.iesdev.com/graphql?query=query+LeagueMatch%28%24region%3ARegion%21%2C%24matchId%3AID%21%29%7Bmatch%28region%3A%24region%2CmatchId%3A%24matchId%29%7D&variables=%7B%22region%22%3A%22${region.toUpperCase()}%22%2C%22matchId%22%3A${matchId}%7D`;
}
