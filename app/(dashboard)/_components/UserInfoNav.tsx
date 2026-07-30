"use client";

import { useUserStore } from "@/lib/store/useUserStore";
import { User as UserIcon, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function UserInfoNav() {
  const { user } = useUserStore();

  const name = user?.data?.name || "User";
  const email = user?.data?.email || "N/A";
  const phone = user?.data?.phoneNumber || "N/A";
  // Default fallback image if avatar/photoURL is missing
  const avatar = user?.data?.photoURL || "https://avatar.iran.liara.run/public";

  return (
    <div className="flex items-center gap-2 sm:gap-3 text-xs">
      {/* Name */}
      <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-zinc-200/60 dark:border-zinc-700/50">
        <UserIcon className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="font-semibold max-w-[100px] sm:max-w-none truncate">
          {name}
        </span>
      </div>

      {/* Email */}
      <div className="hidden md:flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-zinc-200/60 dark:border-zinc-700/50">
        <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="truncate max-w-[150px]">{email}</span>
      </div>

      {/* Phone */}
      <div className="hidden sm:flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-zinc-200/60 dark:border-zinc-700/50">
        <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
        <span>{phone}</span>
      </div>

      {/* Avatar Image */}
      <div className="shrink-0">
        <Image
          src={avatar}
          alt={`${name}'s avatar`}
          width={36}
          height={36}
          priority
          className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800"
        />
      </div>
    </div>
  );
}