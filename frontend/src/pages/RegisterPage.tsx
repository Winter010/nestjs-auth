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
import { registerSchema, type RegisterFormValues } from '@/shared/schemas'

export const RegisterPage = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      console.log('register:', data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container size={420} w="100%">
      <Title ta="center" ff="monospace" fw={400} mb="xs">
        Регистрация
      </Title>

      <Paper withBorder shadow="xl" p={30} radius="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Email"
              placeholder="test@example.com"
              required
              variant="filled"
              {...register('email')}
              error={errors.email?.message}
            />

            <PasswordInput
              label="Пароль"
              placeholder="Минимум 6 символов"
              required
              variant="filled"
              {...register('password')}
              error={errors.password?.message}
            />

            <PasswordInput
              label="Подтвердите пароль"
              placeholder="Повторите пароль"
              required
              variant="filled"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              fullWidth
              mt="lg"
              size="md"
              radius="md"
              loading={isSubmitting}
              gradient={{ from: 'teal', to: 'lime' }}
              variant="gradient"
            >
              Создать аккаунт
            </Button>
          </Stack>
        </form>
      </Paper>

      <Center mt="xl">
        <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
          Уже есть аккаунт?{' '}
          <Anchor size="sm" component={Link} to="/login" fw={700}>
            Войти
          </Anchor>
        </Text>
      </Center>
    </Container>
  )
}
