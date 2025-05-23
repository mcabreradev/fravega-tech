'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { Toaster } from 'sonner'

const MINUTE = 1000 * 60

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: MINUTE * 5, // 5 minutes
      gcTime: MINUTE * 2, // this sets the garbage collection time to 2 seconds
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <Toaster />
        {children}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
