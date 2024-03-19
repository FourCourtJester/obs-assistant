// Import core components
import { Container } from 'react-bootstrap'

// Import our components
import { ActionCreator } from './components'
import { useOBS } from './hooks'

export default function Page() {
  useOBS()

  return (
    <Container className="p-0 m-0 h-100" fluid>
      <ActionCreator />
    </Container>
  )
}
