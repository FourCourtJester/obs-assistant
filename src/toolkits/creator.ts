// Import interfaces
import { OBSEventTypes, OBSWebSocketError } from 'obs-websocket-js'

// Import our components
import { channelName } from '@/toolkits/utils'

export interface CollectionPortReducer {
  (data: OBSEventTypes['CurrentSceneCollectionChanged']): void
}

export interface ConnectionPortProps {
  currentCollection?: string
  error?: OBSWebSocketError
  scenes?: string[]
}

export interface ConnectionPortReducer {
  [key: string]: (data: ConnectionPortProps) => void
}

export interface ConnectionMessageProps {
  data: {
    event: 'connected' | 'disconnected'
    data: ConnectionPortProps
  }
}

const ports = {
  collection: channelName('creator', 'collection'),
  connection: channelName('creator', 'connection'),
}

export const CollectionPort = ports.collection
export const ConnectionPort = ports.connection

export function CollectionMessage(
  reducer: CollectionPortReducer,
  props: { data: OBSEventTypes['CurrentSceneCollectionChanged'] },
) {
  reducer(props.data)
}

export function ConnectionMessage(
  reducer: ConnectionPortReducer,
  props: ConnectionMessageProps,
) {
  reducer[props.data.event](props.data.data)
}
