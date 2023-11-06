import { leagueMatchlist } from '../api/matches';
import Card from './Card';

import styles from './MatchHistory.module.css';

async function MatchHistory({ region, puuid }) {
  const fetchOptions = {
    next: {
      revalidate: 3600,
      tags: [region, puuid],
    },
  };

  const req = await fetch(leagueMatchlist({ region, puuid }), fetchOptions);
  const res = await req.json();

  if (!res?.data?.matchlist?.matches) return <div>Error</div>;

  const {
    data: {
      matchlist: { matches = [] },
    },
  } = res;

  return (
    <div className={styles.matchHistory}>
      <ol>
        {matches.map((match) => (
          <li key={match.id}>
            <Card>Match {match.id}</Card>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MatchHistory;
