// Import core components
import { Accordion, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/* eslint-disable-next-line */
export interface NewProps {}

export function New(props: NewProps) {
  return (
    <Accordion.Item
      className="d-flex flex-column flex-grow-0"
      eventKey="creator"
    >
      <Accordion.Header>Create New Action</Accordion.Header>
      <Accordion.Body className="d-flex justify-content-center">
        <Link to="/new/obs">
          <Button variant="obs">Create OBS Action</Button>
        </Link>
      </Accordion.Body>
    </Accordion.Item>
  )
}
