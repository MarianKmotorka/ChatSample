import React, { useRef } from 'react'
import { Popover as PopoverAntd } from 'antd'

const Popover = ({ children, className = '', ...rest }) => {
  const containerRef = useRef()

  return (
    <div ref={containerRef} className={className}>
      <PopoverAntd {...rest} getPopupContainer={() => containerRef.current}>
        {children}
      </PopoverAntd>
    </div>
  )
}

export default Popover
