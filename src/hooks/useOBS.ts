// Import core components
import { useMemo } from 'react'

// Import our components
import { OBS } from '@/singletons'

// eslint-disable-next-line
export interface UseOBSProps {}

const instance = OBS.getInstance()

export function useOBS(props?: UseOBSProps): OBS {
  return useMemo(() => {
    instance.connect({ ...props })
    return instance
  }, [props])
}
