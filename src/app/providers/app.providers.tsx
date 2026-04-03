import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'sonner'

import { queryClient } from './query-client'

import type { ReactNode } from 'react'

function ErrorFallback() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Application error</h1>
      <p className="mt-2 text-sm text-slate-400">Please refresh the page.</p>
    </div>
  )
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
