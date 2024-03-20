// Import our components
import { channelName } from '@/toolkits/utils'
import protocol from '@/assets/obs.json'

export const events = protocol.events.reduce((obj, event) => {
  if (event.deprecated) return obj

  const { description, eventType, dataFields } = event

  return { ...obj, [eventType]: { description, eventType, dataFields } }
}, {})
export const port = channelName('obs')
export const requests = protocol.requests.reduce((obj, request) => {
  if (request.deprecated) return obj

  const { description, requestType, requestFields, responseFields } = request

  return {
    ...obj,
    [requestType]: { description, requestType, requestFields, responseFields },
  }
}, {})
