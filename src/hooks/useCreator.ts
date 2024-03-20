// Import core components
import { useMemo } from 'react'

// Import our components
import { Creator } from '@/singletons'

// eslint-disable-next-line
export interface UseCreatorProps {}

const instance = Creator.getInstance()

export function useCreator(props?: UseCreatorProps): Creator {
  return useMemo(() => instance, [])
}
