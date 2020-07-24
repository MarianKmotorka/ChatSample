import React, { useRef } from 'react'
import { Tooltip as TooltipAntd } from 'antd'

const Tooltip = ({ children, text, placement, ...rest }) => {
  const containerRef = useRef()

  return (
    <div ref={containerRef}>
      <TooltipAntd
        {...rest}
        placement={placement}
        title={text}
        getPopupContainer={() => containerRef.current}
      >
        {children}
      </TooltipAntd>
    </div>
  )
}

export default Tooltip
