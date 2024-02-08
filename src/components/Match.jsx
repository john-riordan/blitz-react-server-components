import Image from 'next/image';

import Card from './Card';
import { champPortrait } from '../api/assets';
import styles from './Match.module.css';

import { leagueMatch } from '../api/matches';

async function Match({ matchId, puuid: localPlayerPuuid }) {
  const [region, id] = matchId.split('_');
  const url = leagueMatch({ region, matchId: id });
  const req = await fetch(url);
  const res = await req.json();

  // fake slow response
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500));

  if (!res?.data?.match)
    return <Card className={styles.match}>Error loading match</Card>;

  const {
    data: {
      match: {
        info: { participants, teams },
      },
    },
  } = res;

  const localPlayer = participants.find((p) => p.puuid === localPlayerPuuid);
  const didWin = teams.find((t) => t.teamId == localPlayer.teamId)?.win;

  return (
    <Card className={styles.match}>
      <Image
        src={champPortrait(localPlayer.championId)}
        width='60'
        height='60'
        alt={localPlayerPuuid}
        style={{ objectViewBox: 'inset(10% 10% 10% 10%)', borderRadius: 5 }}
      />
      <h4 style={{ color: didWin ? '#00b1ff' : '#ff0043' }}>
        {didWin ? 'Victory' : 'Defeat'}
      </h4>
    </Card>
  );
}

export default Match;

export function MatchLoading() {
  return <Card className={styles.match} />;
}
