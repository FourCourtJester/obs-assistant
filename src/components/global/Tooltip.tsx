// Import core components
import { ReactElement } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// Import interfaces
import { OverlayTriggerType } from 'react-bootstrap/esm/OverlayTrigger'
import { Placement } from 'react-bootstrap/esm/types'

// Import our components
// ...

interface ToolTipProps {
  children: ReactElement
  placement?: Placement
  title: string
  trigger?: OverlayTriggerType | OverlayTriggerType[] | undefined
}

export const ToolTip = ({
  children,
  title,
  placement,
  trigger,
}: ToolTipProps) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip>{title}</Tooltip>}
      trigger={trigger}
    >
      {children}
    </OverlayTrigger>
  )
}
