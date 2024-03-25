// Import core components
import { useMemo } from 'react'

// Import our components
// ...

export function useChannel(name: string): BroadcastChannel {
  return useMemo(() => {
    return new BroadcastChannel(name)
  }, [name])
}
