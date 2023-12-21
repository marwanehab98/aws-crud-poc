'use client';

import { useEffect, useState } from 'react';
import isAuth from './IsAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavigationBar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginURL = `${process.env.COGNITO_DOMAIN}/login?response_type=token&client_id=${process.env.COGNITO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}/redirect-login`

  useEffect(() => {
    setIsAuthenticated(isAuth());
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    localStorage.clear();
    setIsAuthenticated(false);
    router.replace('/redirect-login');
  };

  return (
    <div className="flex justify-between rounded-lg bg-black p-3.5 lg:p-6">
      <h1 className="text-xl font-medium text-gray-300">Oyoun Masr</h1>
      {!isAuthenticated && (
        <Link
          className="text-xl font-medium text-gray-300"
          target="_parent"
          href={loginURL}
        >
          Login
        </Link>
      )}
      {isAuthenticated && (
        <button
          className="text-xl font-medium text-gray-300"
          onClick={handleClick}
        >
          Logout
        </button>
      )}
    </div>
  );
}
