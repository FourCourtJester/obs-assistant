// Import core components
import { Accordion } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

// Import our components
import { Credentials, New } from '@/components'
import { AccordionHeader } from '@/styled'

/* eslint-disable-next-line */
export interface ActionCreatorProps {}

export function DefaultPage(props: ActionCreatorProps) {
  return (
    <Accordion
      className="d-flex flex-column h-100"
      defaultActiveKey="actions"
      flush
    >
      <div className="accordion-item d-flex flex-column flex-grow-1 overflow-hidden">
        <AccordionHeader className="accordion-header d-flex py-3">
          OBS Assistant
        </AccordionHeader>
        <div className="accordion-body scrollbar h-100">
          <Outlet />
        </div>
      </div>
      <Credentials />
      <New />
    </Accordion>
  )
}
