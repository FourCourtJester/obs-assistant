// Import core components
import { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'

// Import interfaces
import { ConnectionPortProps } from '@/toolkits/creator'

// Import our components
import { useChannel } from '@/hooks'
import { AccordionHeader } from '@/styled'
import { ConnectionMessage, ConnectionPort } from '@/toolkits/creator'

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  // Hooks
  const channel = useChannel(ConnectionPort)
  // States
  const [collectionName, setCollectionName] = useState('')

  useEffect(() => {
    const outcomes = {
      connected: (data: ConnectionPortProps) =>
        setCollectionName(data?.currentCollection || ''),
      disconnected: () => setCollectionName(''),
    }

    const onMessage = ConnectionMessage.bind(null, outcomes)

    channel.addEventListener('message', onMessage)

    return () => {
      channel.removeEventListener('message', onMessage)
    }
  }, [channel])

  return (
    <AccordionHeader className="accordion-header d-flex py-3">
      OBS Assistant
      <Badge className="ms-2" bg="primary">
        {collectionName}
      </Badge>
    </AccordionHeader>
  )
}
