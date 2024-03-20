// Import core components
// ...

// Import interfaces
import {
  OBSResponseTypes,
  RequestBatchRequest as OBSRequestBatchRequest,
} from 'obs-websocket-js'

// Import our components
import { OBS } from '@/singletons'

interface GetOBSSourcesProps {
  currentCollection?: string
  scenes: OBSResponseTypes['GetSceneList']['scenes']
}

class Singleton {
  static #instance: Singleton

  #obs = OBS.getInstance()

  constructor() {
    // Save the instance
    Singleton.#instance = this

    this.#obs.on('Identified', () => {
      return Promise.resolve()
        .then(() => this.#getOBSCollection())
        .then((data) => this.#getOBSSources(data))
        .then(({ currentCollection, scenes }) => {
          // TODO: Persistent storage
          console.log({ currentCollection, scenes })
        })
    })
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
    console.log(currentCollection, scenes)

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

  // Public Functions

  // Static Functions

  static getInstance() {
    return Singleton.#instance ? Singleton.#instance : new Singleton()
  }
}

export default Singleton
