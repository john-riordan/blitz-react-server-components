import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href='/na1/rio-rio'>Rió profile</Link>
    </main>
  );
}
