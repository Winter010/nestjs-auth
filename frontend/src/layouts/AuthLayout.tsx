import { Center } from '@mantine/core'
import type { PropsWithChildren } from 'react'

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return <Center mih="100vh">{children}</Center>
}
