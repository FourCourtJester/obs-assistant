// Import core components
import OBSWebSocket from 'obs-websocket-js'

// Import interfaces
import {
  EventTypes as OBSEventTypes,
  OBSRequestTypes,
  OBSResponseTypes,
  RequestBatchOptions as OBSRequestBatchOptions,
  RequestBatchRequest as OBSRequestBatchRequest,
} from 'obs-websocket-js'

// Import our components
// ...

interface OBSConnectProps {
  host?: string
  port?: number
  password?: string
}

interface OBSConfigClientProps extends OBSConnectProps {
  connecting: boolean
  connected: boolean
}

interface OBSConfigProps {
  client: OBSConfigClientProps
  reconnect?: ReturnType<typeof setTimeout>
}

const defaults = { host: '127.0.0.1', port: 4455, password: undefined }

class Singleton {
  static #instance: Singleton

  #actions = {}

  #config: OBSConfigProps = {
    client: {
      host: undefined,
      connecting: false,
      connected: false,
    },
  }

  #ws: OBSWebSocket

  constructor() {
    // Save the instance
    Singleton.#instance = this

    this.#ws = new OBSWebSocket()

    this.#ws.on('Identified', () => {
      console.log('OBS Connection Opened')

      this.#config.client.connecting = false
      this.#config.client.connected = true
    })

    this.#ws.on('ConnectionClosed', (err) => {
      console.log('OBS Connection Closed', err)

      clearTimeout(this.#config.reconnect)

      this.#config.client.connecting = false
      this.#config.client.connected = false

      this.#config.reconnect = setTimeout(() => this.connect(), 5 * 1000)
    })
  }

  // Private Functions

  #defaults(props: OBSConnectProps) {
    this.#config.client.host = props?.host || defaults.host
    this.#config.client.port = props?.port || defaults.port
    this.#config.client.password = props?.password || defaults.password
  }

  // Public Functions

  call<T extends keyof OBSRequestTypes>(request: T, data?: OBSRequestTypes[T]) {
    return this.#ws.call(request, data)
  }

  batch(requests: OBSRequestBatchRequest[], options?: OBSRequestBatchOptions) {
    return this.#ws.callBatch(requests, options)
  }

  connect(props: OBSConnectProps = {}) {
    if (this.#config.client.connecting || this.#config.client.connected)
      return false

    this.#defaults(props)

    const url = `ws://${this.#config.client.host}:${this.#config.client.port}`

    this.#config.client.connecting = true

    return this.#ws
      .connect(url, this.#config.client.password)
      .catch((err) => console.error(err))
  }

  off<T extends keyof OBSEventTypes>(
    event: T,
    fn: (response: OBSEventTypes[T]) => void,
  ) {
    // @ts-expect-error Cannot seem to infer correct typing
    return this.#ws.off(event, fn)
  }

  on<T extends keyof OBSEventTypes>(
    event: T,
    fn: (response: OBSEventTypes[T]) => void,
  ) {
    // @ts-expect-error Cannot seem to infer correct typing
    return this.#ws.on(event, fn)
  }

  // Static Functions

  static getInstance() {
    return Singleton.#instance ? Singleton.#instance : new Singleton()
  }
}

export default Singleton
