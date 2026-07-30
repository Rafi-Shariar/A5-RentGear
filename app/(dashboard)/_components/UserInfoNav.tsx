"use client";


import { useUserStore } from "@/lib/store/useUserStore";
import { User as UserIcon, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function UserInfoNav() {
  const { user } = useUserStore();

  return (
    <div className="flex items-center gap-2 sm:gap-3 text-xs">
      {/* Name */}
      <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-zinc-200/60 dark:border-zinc-700/50">
        <UserIcon className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="font-semibold max-w-[100px] sm:max-w-none truncate">{user?.data.name}</span>
      </div>

      {/* Email */}
      <div className="hidden md:flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-zinc-200/60 dark:border-zinc-700/50">
        <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="truncate max-w-[150px]">{user?.data.email}</span>
      </div>

      {/* Phone */}
      <div className="hidden sm:flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-zinc-200/60 dark:border-zinc-700/50">
        <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
        <span>{user?.data.phoneNumber}</span>
      </div>

      <div>
        <Image
                      src={user.data.photoURL}
                      alt={`${user.data.name}'s avatar`}
                      width={36}
                      height={36}
                      priority
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800"
                    />
      </div>
    </div>
  );
}