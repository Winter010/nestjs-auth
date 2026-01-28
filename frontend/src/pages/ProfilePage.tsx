import {
  Container,
  Paper,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Avatar,
  Divider,
  Button,
} from '@mantine/core'

import { useNavigate } from 'react-router'
import { ROUTES } from '@/shared/constants'
import { useAuth } from '@/contexts/AuthContext'

export const ProfilePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate(ROUTES.login)
  }

  return (
    <Container size="sm" py={40}>
      <Title order={2} mb="xl" ta="center">
        Профиль
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md">
        <Stack gap="xl">
          <Group justify="space-between">
            <Group>
              <Avatar size="lg" radius="xl" color="blue" variant="light">
                {user.email[0].toUpperCase()}
              </Avatar>
              <Stack gap={0}>
                <Text size="lg" fw={700}>
                  {user.email}
                </Text>
                <Text size="xs" c="dimmed">
                  ID: {user.id}
                </Text>
              </Stack>
            </Group>

            <Badge
              color={user.role === 'admin' ? 'red' : 'blue'}
              variant="filled"
              size="lg"
            >
              {user.role.toUpperCase()}
            </Badge>
          </Group>

          <Divider />

          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Детали аккаунта
            </Text>
            <Paper withBorder p="sm" bg="gray.0">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Электронная почта:
                </Text>
                <Text size="sm" fw={500}>
                  {user.email}
                </Text>
              </Group>
            </Paper>
          </Stack>

          <Stack gap="sm" mt="md">
            {user.role === 'admin' && (
              <Button
                variant="filled"
                color="blue"
                fullWidth
                onClick={() => navigate(ROUTES.admin)}
              >
                Админ-панель
              </Button>
            )}

            <Button
              variant="light"
              color="red"
              fullWidth
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}
