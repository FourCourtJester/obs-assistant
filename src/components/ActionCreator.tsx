// Import core components
import { Accordion } from 'react-bootstrap'

// Import our components
import { Actions, Creator, Credentials } from './'

/* eslint-disable-next-line */
export interface ActionCreatorProps {}

export function ActionCreator(props: ActionCreatorProps) {
  return (
    <Accordion
      className="d-flex flex-column h-100"
      defaultActiveKey="actions"
      flush
    >
      <Actions />
      <Credentials />
      <Creator />
    </Accordion>
  )
}
