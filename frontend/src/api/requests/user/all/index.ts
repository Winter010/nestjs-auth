import type { RequestConfig } from '@/api/types'
import { api } from '../../../instance'
import type { User } from '@/shared/types'

export interface GetUserAllParams {
  search?: string
  page?: number
  limit?: number
}

export interface GetUserAllRequestConfig extends RequestConfig {
  params?: GetUserAllParams
}

export const getUserAll = (requestConfig?: GetUserAllRequestConfig) =>
  api.get<{
    items: User[]
    total: number
    page: number
    limit: number
    totalPages: number
  }>('user/all', {
    ...requestConfig?.config,
    params: requestConfig?.params,
  })
