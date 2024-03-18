// Import core components
import { Container } from 'react-bootstrap'

// Import our components
import { ActionCreator } from '@obs-assistant/ActionCreator'

export default function Page() {
  return (
    <Container className="p-0 m-0 h-100" fluid>
      <ActionCreator />
    </Container>
  )
}
