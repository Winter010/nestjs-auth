import { BrowserRouter } from 'react-router'
import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/api/queryClient'
import { AuthProvider } from '@/contexts/AuthContext'
import { AppRouter } from './AppRouter'

import '@mantine/core/styles.css'
import './index.css'

export const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
