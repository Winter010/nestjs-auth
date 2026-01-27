import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Stack,
  Anchor,
  Center,
} from '@mantine/core'
import { Link, useNavigate } from 'react-router'
import { loginSchema, type LoginFormValues } from '@/shared/schemas'

export const LoginPage = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log('login:', data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container size={420} w="100%">
      <Title ta="center" ff="monospace" fw={400} mb="xs">
        Вход
      </Title>

      <Paper withBorder shadow="xl" p={30} radius="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Email"
              placeholder="hello@mantine.dev"
              required
              variant="filled"
              {...register('email')}
              error={errors.email?.message}
            />

            <PasswordInput
              label="Пароль"
              placeholder="Ваш пароль"
              required
              variant="filled"
              {...register('password')}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              mt="lg"
              size="md"
              radius="md"
              loading={isSubmitting}
              gradient={{ from: 'blue', to: 'cyan' }}
              variant="gradient"
            >
              Войти в систему
            </Button>
          </Stack>
        </form>
      </Paper>

      <Center mt="xl">
        <Text c="dimmed" size="sm" ta="center" mb={30}>
          Еще нет аккаунта?{' '}
          <Anchor size="sm" component={Link} to="/register" fw={700}>
            Создать аккаунт
          </Anchor>
        </Text>
      </Center>
    </Container>
  )
}
