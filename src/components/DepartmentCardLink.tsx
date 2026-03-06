'use client';

import Link from 'next/link';
import { markOrganizationScrollForRestore } from '@/components/OrganizationScrollRestore';
import { type ReactNode } from 'react';

type DepartmentCardLinkProps = {
  href: string;
  className: string;
  ariaLabel: string;
  children: ReactNode;
};

export default function DepartmentCardLink({ href, className, ariaLabel, children }: DepartmentCardLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        markOrganizationScrollForRestore();
      }}
    >
      {children}
    </Link>
  );
}
