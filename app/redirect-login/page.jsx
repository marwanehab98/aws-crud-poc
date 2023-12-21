'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectUri() {
  const router = useRouter();
  const hash = window.location.hash.slice(1);
  const splitHash = hash.split('&');

  useEffect(() => {
    splitHash.forEach((value) => {
      const hashObject = value.split('=');
      if (hashObject[0] === 'expires_in') {
        let expiration_date = Date.now() / 1000 + parseInt(hashObject[1]);
        localStorage.setItem('expiration_date', `${expiration_date}`);
      }
      localStorage.setItem(hashObject[0], hashObject[1]);
    });

    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splitHash]);

  return <></>;
}
