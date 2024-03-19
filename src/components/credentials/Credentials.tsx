// Import core components
import { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Col, Form, Row } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faFloppyDisk,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

// Import our components
import { useOBS } from '@/hooks'
import { ToolTip } from '@/components/global/Tooltip'

/* eslint-disable-next-line */
export interface CredentialsProps {}

export function Credentials(props: CredentialsProps) {
  // Hooks
  const obs = useOBS()
  // States
  const [isOBSConnected, setOBSConnected] = useState(false)

  useEffect(() => {
    function onClose() {
      setOBSConnected(false)
    }

    function onOpen() {
      setOBSConnected(true)
    }

    obs.on('ConnectionClosed', onClose)
    obs.on('ConnectionOpened', onOpen)

    return () => {
      obs.off('ConnectionClosed', onClose)
      obs.off('ConnectionOpened', onOpen)
    }
  }, [obs])

  return (
    <Accordion.Item
      className="d-flex flex-column flex-grow-0"
      eventKey="credentials"
    >
      <Accordion.Header>Credentials</Accordion.Header>
      <Accordion.Body>
        <Form>
          <legend className="h5 d-flex align-items-center">
            OBS Credentials
            {isOBSConnected ? (
              <ToolTip title="Connected">
                <Badge className="ms-2" bg="success">
                  <FontAwesomeIcon icon={faCheck} />
                </Badge>
              </ToolTip>
            ) : (
              <ToolTip title="Disconnected">
                <Badge className="ms-2" bg="danger">
                  <FontAwesomeIcon icon={faTimes} />
                </Badge>
              </ToolTip>
            )}
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
  )
}
