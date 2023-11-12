import { Suspense } from 'react';
import { leagueMatchlist } from '../api/matches';

import Match, { MatchLoading } from './Match';
import styles from './MatchHistory.module.css';

const PAGE_SIZE = 20;

async function MatchHistory({ region, puuid, page }) {
  const fetchOptions = {
    cache: 'no-store',
    next: {
      tags: ['matchlist', region, puuid],
    },
  };

  const req = await fetch(leagueMatchlist({ region, puuid }), fetchOptions);
  const res = await req.json();

  // fake slow response
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!res?.data?.matchlist?.matches) return <div>Error</div>;

  const {
    data: {
      matchlist: { matches = [] },
    },
  } = res;

  const pageStart = (page - 1) * PAGE_SIZE;
  const pageEnd = page * PAGE_SIZE - 1;
  const pageOfMatches = matches.slice(pageStart, pageEnd);

  return (
    <div className={styles.matchHistory}>
      <ol>
        {pageOfMatches.map((match) => (
          <li key={match.id}>
            <Suspense fallback={<MatchLoading />}>
              <Match matchId={match.id} puuid={puuid} />
            </Suspense>
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
