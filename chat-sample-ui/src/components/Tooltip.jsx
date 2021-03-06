import React, { useRef } from 'react'
import { Tooltip as TooltipAntd } from 'antd'

const Tooltip = ({
  children,
  text,
  placement = undefined,
  getPopupContainer = undefined,
  ...rest
}) => {
  const containerRef = useRef()

  return (
    <div ref={containerRef}>
      <TooltipAntd
        {...rest}
        placement={placement}
        title={text}
        getPopupContainer={getPopupContainer || (() => containerRef.current)}
      >
        {children}
      </TooltipAntd>
    </div>
  )
}

export default Tooltip
