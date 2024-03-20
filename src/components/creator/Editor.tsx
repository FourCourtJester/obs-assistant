// Import core components
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faTimes } from '@fortawesome/free-solid-svg-icons'

// Import our components
import { AccordionHeader } from '@/styled'
import { ToolTip } from '@/components'

/* eslint-disable-next-line */
export interface EditorProps {}

export function Editor(props: EditorProps) {
  return (
    <>
      <AccordionHeader className="d-flex align-items-center pb-3 px-0 mb-3">
        OBS Action Editor
        <span className="ms-auto">
          <ToolTip title="Discard">
            <Link to="/">
              <Button className="h-100" variant="danger">
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </Link>
          </ToolTip>
        </span>
        <span className="ms-2">
          <ToolTip title="Save">
            <Button className="h-100" variant="primary">
              <FontAwesomeIcon icon={faFloppyDisk} />
            </Button>
          </ToolTip>
        </span>
      </AccordionHeader>
      <Container fluid>
        <Row>
          <Col>Form goes here</Col>
        </Row>
      </Container>
    </>
  )
}
