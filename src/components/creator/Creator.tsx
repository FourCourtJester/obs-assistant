// Import core components
import { Accordion, Button } from 'react-bootstrap'

/* eslint-disable-next-line */
export interface CreatorProps {}

export function Creator(props: CreatorProps) {
  return (
    <Accordion.Item
      className="d-flex flex-column flex-grow-0"
      eventKey="creator"
    >
      <Accordion.Header>Action Creator</Accordion.Header>
      <Accordion.Body className="d-flex justify-content-center">
        <Button variant="obs">Create OBS Action</Button>
      </Accordion.Body>
    </Accordion.Item>
  )
}
