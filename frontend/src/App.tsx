import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router'

import { AppRouter } from './AppRouter'

import '@mantine/core/styles.css'
import './index.css'

export const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider>
        <AppRouter />
      </MantineProvider>
    </BrowserRouter>
  )
}
