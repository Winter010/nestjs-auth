import { useMutation } from '@tanstack/react-query'

import type { MutationSettings } from '@/api/types'

import * as requests from '../requests'

export const usePostLoginMutation = (
  settings?: MutationSettings<
    requests.PostLoginRequestConfig,
    typeof requests.postLogin
  >,
) => {
  return useMutation({
    mutationKey: ['postLogin'],
    mutationFn: ({ params, config }) =>
      requests.postLogin({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  })
}
