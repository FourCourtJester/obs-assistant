// Import core components
// ...

// Import our components
import { AccordionActionsHeader } from '../../styled'

/* eslint-disable-next-line */
export interface ActionsProps {}

export function Actions(props: ActionsProps) {
  return (
    <div className="accordion-item d-flex flex-column flex-grow-1 overflow-hidden">
      <AccordionActionsHeader className="accordion-header d-flex py-3">
        OBS Assistant
      </AccordionActionsHeader>
      <div className="accordion-body scrollbar h-100">Action List</div>
    </div>
  )
}
