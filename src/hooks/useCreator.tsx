// Import core components
import { useMemo } from 'react'

// Import our components
import { Creator } from '@/singletons'

const instance = Creator.getInstance()

export const useCreator = (props = {}) => useMemo(() => instance, [])
