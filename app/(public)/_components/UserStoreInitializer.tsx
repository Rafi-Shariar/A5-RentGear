"use client";

import { useUserStore } from "@/lib/store/useUserStore";
import { IUser } from "@/lib/types";
import { useEffect, useRef } from "react";


export function UserStoreInitializer({ user }: { user: IUser }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      useUserStore.getState().setUser(user);
      initialized.current = true;
    }
  }, [user]);

  return null; 
}