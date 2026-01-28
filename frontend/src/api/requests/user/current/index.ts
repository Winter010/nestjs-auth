import type { RequestConfig } from '@/api/types'
import { api } from '../../../instance'
import type { User } from '@/shared/types'

type GetCurrentUserRequestConfig = RequestConfig | void

export const getCurrentUser = (params: GetCurrentUserRequestConfig) =>
  api.get<User>('user/current', params?.config)
