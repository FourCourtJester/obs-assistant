// Import interfaces
import { OBSWebSocketError } from 'obs-websocket-js'

// Import our components
import { channelName } from '@/toolkits/utils'

export interface ConnectionPortProps {
  currentCollection?: string
  error?: OBSWebSocketError
  scenes?: string[]
}
export interface ConnectionMessageProps {
  data: {
    event: 'connected' | 'disconnected'
    data: ConnectionPortProps
  }
}

const ports = {
  connection: channelName('creator', 'connection'),
}

export const ConnectionPort = ports.connection

export function ConnectionMessage(
  outcomes: { [key: string]: (data: ConnectionPortProps) => void },
  props: ConnectionMessageProps,
) {
  outcomes[props.data.event](props.data.data)
}
