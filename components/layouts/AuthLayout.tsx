import { FC } from 'react';
import Head from 'next/head';

import styles from '../../styles/auth/AuthLayout.module.css';

interface Props {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout: FC<Props> = ({ children, title = '' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={styles.authContainer}>
        <main className={styles.authWrapper}>
          {children}
        </main>
      </main>
    </>
  );
}