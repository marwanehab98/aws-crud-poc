'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const getHash = () => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.replace('#', '')) : undefined);

export const dynamic = "force-dynamic"

export default function Redirect() {
    const router = useRouter();
    const [hash, setHash] = useState(getHash());

    useEffect(() => {
        const handleHashChange = () => {
            setHash(getHash());
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [])

    useEffect(() => {
        console.log("HASH: ", hash)
        if (hash && hash.length > 0) {
            const splitHash = hash?.split('&');
            splitHash.forEach((value) => {
                const hashObject = value.split('=');
                if (hashObject[0] === 'expires_in') {
                    let expiration_date = Date.now() / 1000 + parseInt(hashObject[1]);
                    localStorage.setItem('expiration_date', `${expiration_date}`);
                }
                localStorage.setItem(hashObject[0], hashObject[1]);
            });

            router.replace('/');
        }
    }, [hash]);

    return <></>;
}