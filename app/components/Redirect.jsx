'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const getHash = () => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.replace('#', '')) : undefined);

export default function Redirect() {
    const router = useRouter();
    const hash = getHash();
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

        router.replace('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [splitHash]);

    return <></>;
}