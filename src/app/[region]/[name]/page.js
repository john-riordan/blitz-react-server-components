import { Suspense } from 'react';

import { leagueProfile } from '../../../api/profile';
import { profileIcon, rankIcon } from '../../../api/assets';
import Card from '../../../components/Card';
import MatchHistory from '../../../components/MatchHistory';
import styles from './page.module.css';

async function Profile({ params, searchParams }) {
  const region = params.region;
  const name = params.name;
  const page = searchParams.page || '1';

  const fetchOptions = {
    cache: 'no-store', // Disable cache
  };

  const req = await fetch(leagueProfile({ region, name }), fetchOptions);
  const res = await req.json();

  console.log(res);

  if (!res?.data?.leagueProfile) return <div>🚨 Error loading profile 🚨</div>;

  const {
    data: {
      leagueProfile: {
        puuid,
        summonerName,
        summonerLevel,
        profileIconId,
        latestRanks = [],
        riotAccount,
      },
    },
  } = res;

  const soloQueueRank =
    latestRanks.find((queue) => queue.queue === 'RANKED_SOLO_5X5') || {};

  return (
    <>
      <header className={styles.header}>
        <img
          src={profileIcon(profileIconId)}
          width='80'
          height='80'
          alt={summonerName}
        />
        <h1>
          {riotAccount?.gameName} #{riotAccount?.tagLine} (Level {summonerLevel}
          )
        </h1>
      </header>
      <div className={styles.columns}>
        <Card className={styles.rank}>
          <img
            src={rankIcon(soloQueueRank.tier)}
            width='60'
            height='60'
            alt={summonerName}
          />
          <h4>
            {soloQueueRank.tier} {soloQueueRank.rank} -{' '}
            {soloQueueRank.leaguePoints} LP
          </h4>
        </Card>
        <div className={styles.matchHistory}>
          <Suspense fallback={<MatchHistory.Loading />}>
            <MatchHistory region={region} puuid={puuid} page={page} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Profile;
