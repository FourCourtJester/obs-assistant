// Import core components
import { Accordion, Badge, Button, Col, Form, Row } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

// Import our components
import { AccordionActionsHeader } from './styled'

/* eslint-disable-next-line */
export interface ActionCreatorProps {}

export function ActionCreator() {
  return (
    <Accordion
      className="d-flex flex-column h-100"
      defaultActiveKey="actions"
      flush
    >
      <div className="accordion-item d-flex flex-column flex-grow-1 overflow-hidden">
        <AccordionActionsHeader className="accordion-header d-flex py-3">
          OBS Assistant
        </AccordionActionsHeader>
        <div className="accordion-body scrollbar h-100">Action List</div>
      </div>
      <Accordion.Item
        className="d-flex flex-column flex-grow-0"
        eventKey="credentials"
      >
        <Accordion.Header>Credentials</Accordion.Header>
        <Accordion.Body>
          <Form>
            <legend className="h5 d-flex align-items-center">
              OBS Credentials
              <Badge className="ms-2" bg="success">
                Connected
              </Badge>
              <Badge className="ms-2" bg="danger">
                Not Connected
              </Badge>
              <span className="ms-auto">
                <Button type="submit">
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </Button>
              </span>
            </legend>
            <Row className="g-2">
              <Col>
                <Form.FloatingLabel label="Port">
                  <Form.Control
                    type="number"
                    defaultValue="4455"
                    placeholder="port"
                  />
                </Form.FloatingLabel>
              </Col>
              <Col>
                <Form.FloatingLabel label="Password">
                  <Form.Control type="password" placeholder="password" />
                </Form.FloatingLabel>
                <Form.Text muted>
                  Leave blank if no authentication is required
                </Form.Text>
              </Col>
            </Row>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        className="d-flex flex-column flex-grow-0"
        eventKey="creator"
      >
        <Accordion.Header>Action Creator</Accordion.Header>
        <Accordion.Body className="d-flex justify-content-center">
          <Button variant="obs">Create OBS Action</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

// export function ActionCreator(props: ActionCreatorProps) {
//   // States
//   const [isActive, setActive] = useState(false)

//   return (
//     <StyledActionCreator
//       className={cN(
//         isActive ? 'active' : false,
//         'position-relative d-grid border-light border-top',
//       )}
//     >
//       <StyledActionCreatorToggle
//         className="toggle position-absolute top-0 start-50 h2 p-0 m-0"
//         onClick={() => setActive((active) => !active)}
//       >
//         <FontAwesomeIcon icon={faSquareCaretDown} />
//       </StyledActionCreatorToggle>
//       <div className="d-flex flex-column justify-content-start px-3 overflow-hidden">
//         <Button variant="obs">Create OBS Action</Button>
//       </div>
//     </StyledActionCreator>
//   )
// }
