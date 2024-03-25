// Import core components
// ...

// Import interfaces
import {
  OBSEventTypes,
  OBSResponseTypes,
  RequestBatchRequest as OBSRequestBatchRequest,
  OBSWebSocketError,
} from 'obs-websocket-js'

// Import our components
import { OBS } from '@/singletons'
import { CollectionPort, ConnectionPort } from '@/toolkits/creator'

interface GetOBSSourcesProps {
  currentCollection?: string
  scenes: OBSResponseTypes['GetSceneList']['scenes']
}

class Singleton {
  static #instance: Singleton

  #obs = OBS.getInstance()

  #ports = {
    collection: new BroadcastChannel(CollectionPort),
    connected: new BroadcastChannel(ConnectionPort),
  }

  constructor() {
    // Save the instance
    Singleton.#instance = this

    this.#obs.on('Identified', () => {
      return Promise.resolve()
        .then(() => this.#getOBSCollection())
        .then((data) => this.#getOBSSources(data))
        .then(({ currentCollection, scenes }) => {
          // TODO: Persistent storage
          // console.log({ currentCollection, scenes })
          this.#ports.connected.postMessage({
            event: 'connected',
            data: { currentCollection, scenes },
          })
        })
        .catch((err) => console.error(err))
    })

    this.#obs.on('ConnectionClosed', (response: OBSWebSocketError) => {
      this.#ports.connected.postMessage({
        event: 'disconnected',
        data: { error: response },
      })
    })

    this.#obs.on(
      'CurrentSceneCollectionChanged',
      (response: OBSEventTypes['CurrentSceneCollectionChanged']) => {
        this.#ports.collection.postMessage(response)
      },
    )
  }

  // Private Functions

  #getOBSCollection() {
    return this.#obs
      .batch([
        { requestType: 'GetSceneCollectionList' },
        { requestType: 'GetSceneList' },
      ])
      .then((responses) => {
        const currentCollection = (
          responses[0]
            .responseData as OBSResponseTypes['GetSceneCollectionList']
        ).currentSceneCollectionName

        const scenes = (
          responses[1].responseData as OBSResponseTypes['GetSceneList']
        ).scenes

        return { currentCollection, scenes }
      })
  }

  #getOBSSources({ currentCollection, scenes }: GetOBSSourcesProps) {
    return this.#obs
      .batch(
        scenes.map(({ sceneName }) => ({
          requestType: 'GetSceneItemList',
          requestData: { sceneName },
        })) as OBSRequestBatchRequest[],
      )
      .then((responses) => {
        return {
          currentCollection,
          scenes: scenes
            .map(({ sceneIndex, sceneName }) => {
              const sceneSources = (
                responses[sceneIndex as number]
                  .responseData as OBSResponseTypes['GetSceneItemList']
              ).sceneItems.map((item) => ({
                name: item.sourceName,
                type: item.inputKind,
              }))
              return { sceneIndex, sceneName, sceneSources }
            })
            .reverse(),
        }
      })
  }

  // #test() {
  //   const actions = [
  //     [
  //       {
  //         event: 'CurrentProgramSceneChanged',
  //         data: {
  //           sceneName: 'Game',
  //         },
  //       },
  //       {
  //         requestType: 'SetSceneItemEnabled',
  //         requestData: {
  //           sceneName: 'Game',
  //           sceneItemId: 1,
  //           sceneItemEnabled: true,
  //         },
  //       },
  //     ],
  //   ]

  //   actions.forEach((action) => {
  //     const trigger = action[0] as {
  //       event: keyof OBSEventTypes
  //       data: { sceneName: string }
  //     }
  //     const stages: object[] = action.slice(1) || []

  //     this.#obs.on(
  //       trigger.event,
  //       (response: OBSEventTypes[typeof trigger.event]) => {
  //         const success = Object.entries(trigger.data).some(
  //           ([key, val]) => response?.[key] === val,
  //         )

  //         if (!success) return false

  //         return this.#obs.batch(stages as OBSRequestBatchRequest[])
  //       },
  //     )
  //   })
  // }

  // Public Functions

  // Static Functions

  static getInstance() {
    return Singleton.#instance ? Singleton.#instance : new Singleton()
  }
}

export default Singleton
