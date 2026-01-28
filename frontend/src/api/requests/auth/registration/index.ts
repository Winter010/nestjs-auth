import type { RequestConfig } from '@/api/types'
import { api } from '../../../instance'

export interface PostRegistrationParams {
  email: string
}
export type PostRegistrationRequestConfig =
  RequestConfig<PostRegistrationParams>

export const postRegistration = ({
  params,
  config,
}: PostRegistrationRequestConfig) =>
  api.post<{ email: string }>('auth/registration', params, config)
