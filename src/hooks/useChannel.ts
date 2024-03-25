// Import core components
import { useMemo } from 'react'

// Import interfaces
import {
  CollectionMessage,
  CollectionPortReducer,
  ConnectionMessage,
  ConnectionPortReducer,
} from '@/toolkits/creator'

// Import our components
// ...

export function useChannel(
  name: string,
  fn: typeof ConnectionMessage | typeof CollectionMessage,
  reducer: ConnectionPortReducer | CollectionPortReducer,
): BroadcastChannel {
  return useMemo(() => {
    const channel = new BroadcastChannel(name)

    // @ts-expect-error Doesn't seem to understand functions can be bound
    channel.addEventListener('message', fn?.bind(null, reducer))

    return channel

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
}
