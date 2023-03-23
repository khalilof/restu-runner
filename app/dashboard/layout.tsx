'use client';
import { Providers } from '@/app/store/provider';
import { ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({children}: Props): ReactElement {
  return (
      <Providers>{children}</Providers>
  );
}
