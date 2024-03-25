// Import core components
import { FormEvent, useEffect, useState } from 'react'
import {
  Accordion,
  Badge,
  Button,
  Col,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

// Import our components
import { ToolTip } from '@/components/global/Tooltip'
import { useChannel, useOBS } from '@/hooks'
import { ConnectionMessage, ConnectionPort } from '@/toolkits/creator'

/* eslint-disable-next-line */
export interface CredentialsProps {}

export function Credentials(props: CredentialsProps) {
  // Hooks
  const channel = useChannel(ConnectionPort)
  const obs = useOBS()
  // States
  const [isValidated, setValidated] = useState(false)
  const [isOBSConnected, setOBSConnected] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.currentTarget.checkValidity() === false) {
      setValidated(true)
      return false
    }

    // @ts-expect-error No valid typing for this transformation
    const obj = [...new URLSearchParams(new FormData(e.currentTarget))].reduce(
      (_obj, [key, val]) => ({ ..._obj, [key]: val || undefined }),
      {},
    )

    obs.connect(obj)
    setValidated(false)

    return false
  }

  useEffect(() => {
    const outcomes = {
      connected: () => setOBSConnected(true),
      disconnected: () => setOBSConnected(false),
    }

    const onMessage = ConnectionMessage.bind(null, outcomes)

    channel.addEventListener('message', onMessage)

    return () => {
      channel.removeEventListener('message', onMessage)
    }
  }, [channel])

  return (
    <Accordion.Item
      className="d-flex flex-column flex-grow-0"
      eventKey="credentials"
    >
      <Accordion.Header>Credentials</Accordion.Header>
      <Accordion.Body>
        <Form
          noValidate
          validated={isValidated}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <legend className="h5 d-flex align-items-center">
            OBS Credentials
            {isOBSConnected ? (
              <ToolTip title="Connected">
                <Badge className="ms-2" bg="success">
                  <FontAwesomeIcon icon={faCheck} />
                </Badge>
              </ToolTip>
            ) : (
              <ToolTip title="Attempting to connect">
                <Badge className="ms-2" bg="danger">
                  <Spinner size="sm" />
                </Badge>
              </ToolTip>
            )}
            <span className="ms-auto">
              <ToolTip title="Save">
                <Button type="submit">
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </Button>
              </ToolTip>
            </span>
          </legend>
          <Row className="g-2">
            <Col>
              <Form.FloatingLabel label="Port">
                <Form.Control
                  type="number"
                  name="port"
                  defaultValue="4455"
                  placeholder="port"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a port number
                </Form.Control.Feedback>
              </Form.FloatingLabel>
            </Col>
            <Col>
              <Form.FloatingLabel label="Password">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="password"
                />
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
