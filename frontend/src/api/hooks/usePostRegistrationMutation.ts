import { useMutation } from '@tanstack/react-query'

import type { MutationSettings } from '@/api/types'

import * as requests from '../requests'

export const usePostRegistrationMutation = (
  settings?: MutationSettings<
    requests.PostRegistrationRequestConfig,
    typeof requests.postRegistration
  >,
) => {
  useMutation({
    mutationKey: ['postRegistration'],
    mutationFn: ({ params, config }) =>
      requests.postRegistration({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  })
}
