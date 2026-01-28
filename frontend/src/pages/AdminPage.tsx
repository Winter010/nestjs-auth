import { useState } from 'react'
import {
  Badge,
  Box,
  Button, // Добавили кнопку
  Center,
  Container,
  Divider,
  Group,
  Loader,
  Pagination,
  Paper,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useNavigate } from 'react-router'

import { useGetUserAllQuery } from '@/api/hooks'

import { ROUTES } from '@/shared/constants'
import { useAuth } from '@/contexts/AuthContext'

export const AdminPage = () => {
  const { logout } = useAuth()

  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebouncedValue(search, 500)

  const { data, isLoading } = useGetUserAllQuery({
    search: debouncedSearch,
    page,
    limit: 10,
  })

  const users = data?.data.items
  const totalPages = data?.data.totalPages ?? 0

  const handleLogout = () => {
    logout()
    navigate(ROUTES.login)
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={2} ff="monospace">
            Админ-панель
          </Title>
          <Group>
            <Button variant="subtle" onClick={() => navigate(ROUTES.profile)}>
              Профиль
            </Button>
            <Button variant="light" color="red" onClick={handleLogout}>
              Выйти
            </Button>
          </Group>
        </Group>

        <Divider />

        <Paper withBorder p="md" radius="md" shadow="sm">
          <TextInput
            label="Поиск по базе"
            placeholder="Введите email пользователя..."
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value)
              setPage(1)
            }}
          />
        </Paper>

        <Paper withBorder radius="md" shadow="sm" pos="relative">
          <Box style={{ minHeight: '500px' }}>
            {isLoading && (
              <Center
                pos="absolute"
                inset={0}
                bg="rgba(255, 255, 255, 0.7)"
                style={{ zIndex: 2, borderRadius: 'inherit' }}
              >
                <Loader color="blue" />
              </Center>
            )}

            <Table highlightOnHover verticalSpacing="sm" layout="fixed">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w={80}>ID</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th w={120}>Роль</Table.Th>
                  <Table.Th w={180}>Регистрация</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users?.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>
                      <Text size="xs" c="dimmed">
                        #{user.id}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={500} truncate="end">
                        {user.email}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={user.role === 'admin' ? 'red' : 'blue'}
                        variant="light"
                        fullWidth
                      >
                        {user.role}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c="dimmed">
                        {new Date(user.createdAt).toLocaleString()}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}

                {!isLoading && users?.length === 0 && (
                  <Table.Tr>
                    <Table.Td colSpan={4}>
                      <Center py="xl">
                        <Text c="dimmed">Ничего не найдено</Text>
                      </Center>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </Box>
        </Paper>

        <Box h={45} mt="md">
          {totalPages > 1 ? (
            <Group justify="center">
              <Pagination
                total={totalPages}
                value={page}
                onChange={setPage}
                radius="md"
              />
            </Group>
          ) : null}
        </Box>
      </Stack>
    </Container>
  )
}
