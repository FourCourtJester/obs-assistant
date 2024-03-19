// Import core components
import { useMemo } from 'react'

// Import our components
import { OBS } from '@/singletons'

const instance = OBS.getInstance()

export const useOBS = (props = {}) =>
  useMemo(() => {
    instance.connect({ ...props })
    return instance
  }, [props])
