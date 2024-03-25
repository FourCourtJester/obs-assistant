// Import core components
import { useState } from 'react'
import { Badge } from 'react-bootstrap'

// Import our components
import { useChannel } from '@/hooks'
import { AccordionHeader } from '@/styled'
import {
  CollectionMessage,
  CollectionPort,
  ConnectionMessage,
  ConnectionPort,
} from '@/toolkits/creator'

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  // States
  const [collectionName, setCollectionName] = useState('')

  // Hooks
  useChannel(ConnectionPort, ConnectionMessage, {
    connected: (data) => setCollectionName(data?.currentCollection || ''),
    disconnected: () => setCollectionName(''),
  })
  useChannel(CollectionPort, CollectionMessage, (data) =>
    setCollectionName(data.sceneCollectionName),
  )

  return (
    <AccordionHeader className="accordion-header d-flex py-3">
      OBS Assistant
      <Badge className="ms-2" bg="primary">
        {collectionName}
      </Badge>
    </AccordionHeader>
  )
}
