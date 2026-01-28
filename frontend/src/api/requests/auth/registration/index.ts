import type { RequestConfig } from '@/api/types'
import { api } from '../../../instance'
import type { User } from '@/shared/types'

export interface PostRegistrationParams {
  email: string
  password: string
}
export type PostRegistrationRequestConfig =
  RequestConfig<PostRegistrationParams>

export const postRegistration = ({
  params,
  config,
}: PostRegistrationRequestConfig) =>
  api.post<{ user: User; token: string }>('auth/registration', params, config)
