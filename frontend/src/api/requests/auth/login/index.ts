import type { RequestConfig } from '@/api/types'
import type { User } from '@/shared/types'

import { api } from '../../../instance'

export interface PostLoginParams {
  email: string
  password: string
}
export type PostLoginRequestConfig = RequestConfig<PostLoginParams>

export const postLogin = ({ params, config }: PostLoginRequestConfig) =>
  api.post<{ user: User; token: string }>('auth/login', params, config)
