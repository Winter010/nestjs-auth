import { Navigate, Outlet, Route, Routes } from 'react-router'
import { Loader } from '@mantine/core'

import { AuthLayout } from './layouts/AuthLayout'
import { PrivateLayout } from './layouts/PrivateLayout'

import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { RegisterPage } from './pages/RegisterPage'
import { ROUTES } from '@/shared/constants'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        }
      >
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.register} element={<RegisterPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
    </Routes>
  )
}

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PrivateLayout>
            <Outlet />
          </PrivateLayout>
        }
      >
        <Route path={ROUTES.profile} element={<ProfilePage />} />

        <Route path="*" element={<Navigate to={ROUTES.profile} replace />} />
      </Route>
    </Routes>
  )
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PrivateLayout>
            <Outlet />
          </PrivateLayout>
        }
      >
        <Route path={ROUTES.admin} element={<ProfilePage />} />

        <Route path="*" element={<Navigate to={ROUTES.admin} replace />} />
      </Route>
    </Routes>
  )
}

export const AppRouter = () => {
  const userRole = 'user'
  const isLoading = false

  if (isLoading)
    return (
      <AuthLayout>
        <Loader />
      </AuthLayout>
    )

  if (userRole === 'user') return <UserRoutes />
  if (userRole === 'admin') return <AdminRoutes />

  return <PublicRoutes />
}
