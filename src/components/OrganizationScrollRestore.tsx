'use client';

import { useEffect } from 'react';

const SCROLL_KEY = 'organization:directions:scrollY';
const PENDING_KEY = 'organization:directions:restore';

function isDirectionsReturnContext() {
  const hashMatch = window.location.hash === '#directions-services';
  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const fromBackForward = navEntry?.type === 'back_forward';

  let fromDirectionDetail = false;
  if (document.referrer) {
    try {
      const refPath = new URL(document.referrer).pathname;
      fromDirectionDetail = refPath.includes('/organisation/');
    } catch {
      fromDirectionDetail = false;
    }
  }

  return hashMatch || fromBackForward || fromDirectionDetail;
}

export function markOrganizationScrollForRestore() {
  if (typeof window === 'undefined') return;

  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
  sessionStorage.setItem(PENDING_KEY, '1');
}

export default function OrganizationScrollRestore() {
  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_KEY);
    const y = sessionStorage.getItem(SCROLL_KEY);

    if (pending !== '1' || !y || !isDirectionsReturnContext()) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: Number(y), behavior: 'auto' });
      sessionStorage.removeItem(PENDING_KEY);
    });
  }, []);

  return null;
}
