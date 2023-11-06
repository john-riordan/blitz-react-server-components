import { leagueMatchlist } from '../api/matches';

import Match, { MatchLoading } from './Match';
import styles from './MatchHistory.module.css';

async function MatchHistory({ region, puuid }) {
  const fetchOptions = {
    next: {
      revalidate: 0, // 15 mins
      tags: [region, puuid],
    },
  };

  const req = await fetch(leagueMatchlist({ region, puuid }), fetchOptions);
  const res = await req.json();

  await new Promise((resolve) => setTimeout(resolve, 3000));

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
            <Match region={region} matchId={match.id} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MatchHistory;

export function Loading() {
  return (
    <div className={styles.matchHistory}>
      <ol>
        {Array(15)
          .fill(0)
          .map((match, i) => (
            <li key={i}>
              <MatchLoading />
            </li>
          ))}
      </ol>
    </div>
  );
}

MatchHistory.Loading = Loading;
