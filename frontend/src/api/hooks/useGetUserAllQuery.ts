import { useQuery } from '@tanstack/react-query'

import type { QuerySettings } from '@/api/types'

import * as requests from '../requests'

export const useGetUserAllQuery = (
  params?: { search?: string; page?: number; limit?: number },
  settings?: QuerySettings<typeof requests.getUserAll>,
) =>
  useQuery({
    queryKey: ['getUserAll', params],
    queryFn: () =>
      requests.getUserAll({
        params,
        config: settings?.config,
      }),
    ...settings?.options,
  })
