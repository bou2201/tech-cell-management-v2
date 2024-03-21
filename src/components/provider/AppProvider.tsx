'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
