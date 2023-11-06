'use client';

import { useRef, useEffect } from 'react';

import Card from './Card';
import styles from './Match.module.css';

function Match({ region, matchId }) {
  const ref = useRef(null);

  useEffect(() => {
    const options = {};
    const node = ref.current;

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Target element is in view
          // Do something when the element is in view
          console.log(matchId, ' is in view');
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);

    if (node) {
      observer.observe(node);
    }

    return () => {
      observer.unobserve(node);
    };
  }, [ref, matchId]);

  return (
    <Card cardRef={ref} className={styles.match}>
      {matchId}
    </Card>
  );
}

export function MatchLoading() {
  return <Card className={styles.match} />;
}

export default Match;
