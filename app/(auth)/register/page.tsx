import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '../_components/LoginForm';
import LoginImage from '@/assets/RegisterImage.png'; 

const RegisterPage = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-8">
      {/* Container Card */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden min-h-[600px]">
        
        {/* Left Side: Form Section */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14 z-10">
          
          {/* Header & Logo */}
          <div className="mb-8">
            <Link href="/" className="inline-block text-2xl font-extrabold tracking-tight mb-6">
              Share<span className="text-emerald-600 dark:text-emerald-500">Gear</span>
            </Link>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Create An Account
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Please enter your details to join our community.
            </p>
          </div>

          {/* Login Form Component */}
          <LoginForm />

          {/* Footer Link Inside Form */}
          <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            All ready have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 underline underline-offset-4 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Side: Visual / Illustration Section (Hidden on Mobile, Visible on Desktop) */}
        <div className="hidden lg:flex relative flex-col items-center justify-center bg-emerald-50/50 dark:bg-emerald-950/20 border-l border-zinc-100 dark:border-zinc-800/60 p-8 overflow-hidden">
          
          {/* Subtle Background Accent Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-200/40 dark:bg-emerald-900/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-100/60 dark:bg-emerald-950/40 blur-3xl pointer-events-none" />

          {/* Main Image */}
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center transition-transform hover:scale-102 duration-500">
            <Image
              src={LoginImage}
              alt="Login Illustration"
              priority
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Side Note / Testimonial */}
          <div className="mt-6 text-center max-w-sm z-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
              Share & Rent Anywhere
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Access premium tools and gears effortlessly with verified community rentals.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default RegisterPage;