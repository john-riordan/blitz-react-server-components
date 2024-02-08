export function leagueProfile({ region = '', name = '' }) {
  const gameName = name.split('-')?.[0];
  const tagLine = name.split('-')?.[1];
  return `https://riot.iesdev.com/graphql?query=query+LeagueProfile%28%24summoner_name%3AString+%24summoner_id%3AString+%24account_id%3AString+%24region%3ARegion%21+%24puuid%3AString+%24gameName%3AString+%24tagLine%3AString%29%7BleagueProfile%28summoner_name%3A%24summoner_name+summoner_id%3A%24summoner_id+account_id%3A%24account_id+region%3A%24region+puuid%3A%24puuid+gameName%3A%24gameName+tagLine%3A%24tagLine%29%7Branks%28first%3A30%29%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7Did+accountId+puuid+summonerId+summonerName+summonerLevel+profileIconId+riotAccount%7Bid+puuid+gameName+tagLine%7DupdatedAt+latestRanks%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7D%7D%7D&variables=%7B%22region%22%3A%22${region.toUpperCase()}%22%2C%22gameName%22%3A%22${gameName}%22%2C%22tagLine%22%3A%22${tagLine}%22%7D`;
}
