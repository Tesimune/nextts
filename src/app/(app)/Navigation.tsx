import React, { useState } from 'react';
import AppLogo from '@/components/AppLogo';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import { useAuth } from '@/hooks/auth';
import { usePathname } from 'next/navigation';
import Button from '@/components/Button';
import Notify from '@/components/Notify';

interface NavigationProps {
  user: any; // Replace 'any' with actual user type if possible
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const { logout } = useAuth();
  const [status, setStatus] = useState({});

  const submit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    logout({
      setStatus,
    });
  };

  return (
    <div>
      <Notify status={status} />
      <div className="navbar bg-slate-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content gap-3 bg-slate-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink
                  href="/dashboard"
                  active={usePathname() === '/dashboard'}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <Button
                  className="bg-white text-red-500 border-red-500 hover:text-red-700 hover:border-red-300 focus:text-red-700 focus:border-red-300"
                  onClick={submit}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/dashboard">
            <AppLogo className="block h-10 w-auto fill-current text-gray-600" />
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
