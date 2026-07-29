'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function GlobalScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // যেকোনো পেজ ইউআরএল চেঞ্জ হলেই ভিউপোর্ট একদম ওপরে (0,0) নিয়ে যাবে
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}