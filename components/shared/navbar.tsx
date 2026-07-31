'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import logo from '../../assets/logo.png';
import { Button } from '../ui/button';
import { NavbarUser } from '@/lib/types';
import { logout } from '@/services/logout';
import { useUserStore } from '@/lib/store/useUserStore';


const NAV_LINKS = [
  { href: '/gear', label: 'Gears' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/how-it-works', label: 'How It Works' },
];

export default function Navbar() {

  const {user, clearUser} = useUserStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();


  let dashboardRoute;

  if(user?.data.role === "CUSTOMER") dashboardRoute = "/dashboard"
  else if (user?.data.role === "PROVIDER") dashboardRoute = "/provider-dashboard"
  else if (user?.data.role === "ADMIN") dashboardRoute = "/admin-dashboard"
  else dashboardRoute = "";


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Logout using Next.js App Router navigation
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
    clearUser();
    router.push('/login');
    router.refresh();
  };

  const isLoggedIn = user?.success && user?.data;


  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto relative flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-lg shadow-black/5 transition-all">
        
        {/* Left: Logo & Brand */}
        <Link 
          href="/" 
          aria-label="Home"
          className="flex items-center gap-2.5 group z-10"
        >
          <div className="flex items-center justify-center">
            <Image
              src={logo}
              alt="ShareGear Logo"
              width={36}
              height={40}
              priority
            />
          </div>
          <span className="text-xl">
            Share<span className='font-extrabold text-primary'>Gear</span>
          </span>
        </Link>

        {/* Center: Navigation Links (Desktop only - Perfectly Centered) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  isActive
                    ? 'text-primary  font-semibold underline'
                    : 'text-zinc-800 '
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right: Profile Avatar & Responsive Dropdown Menu */}

        <div>
          {isLoggedIn ? <>  
          <div className="relative z-10" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-full transition-transform active:scale-95"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <Image
              src={user.data.photoURL}
              alt={`${user.data.name}'s avatar`}
              width={36}
              height={36}
              priority
              className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800"
            />
          </button>

          {/* Unified Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-60 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl py-2 z-50">
              
              {/* User Info Header */}
              <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {user.data.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {user.data.email}
                </p>
              </div>

              {/* Mobile-Only Navigation Links */}
              <div className="py-1 md:hidden border-b border-zinc-100 dark:border-zinc-800/80">
                <p className="px-4 py-1 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  Navigation
                </p>
                {NAV_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/50 dark:bg-indigo-950/20'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      {label}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                    </Link>
                  );
                })}
              </div>

              {/* Account / Dashboard Links */}
              <div className="py-1">
                <Link
                  href={dashboardRoute}
                  onClick={() => setIsDropdownOpen(false)}
                  className="pt-1 border-b border-zinc-100 flex items-center px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                >
                  Dashboard
                </Link>

                <p className="px-4 py-1 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  PROFILE
                </p>
                <Link
                  href="/update-profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className=" flex items-center px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                >
                  Update Profile
                </Link>

                <Link
                  href="/password"
                  onClick={() => setIsDropdownOpen(false)}
                  className=" flex items-center px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                >
                  Change password
                </Link>
              </div>

              {/* Logout Action */}
              <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  Log out
                </button>
              </div>

            </div>
          )}
        </div>
        </> :
          <>
          <Link href={"/login"}> <Button variant={"default"}>login</Button></Link>
          </>}
        </div>

       

      </nav>
    </header>
  );
}