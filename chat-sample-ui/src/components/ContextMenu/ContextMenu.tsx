import React, { useRef } from 'react'
import { map, isEmpty } from 'lodash'
import { Menu, Dropdown } from 'antd'
import { BarsOutlined } from '@ant-design/icons'

import { Text, StyledButton } from './ContextMenu.styled'

interface ContextMenuItem {
  id: string
  text: string
  onClick: (e: any) => void
}

interface Props {
  items: ContextMenuItem[]
  className?: string
}

const ContextMenu: React.FC<Props> = ({ items, className }) => {
  const containerRef = useRef<HTMLDivElement>(null!)

  if (isEmpty(items)) return null

  const menu = (
    <Menu>
      {map(items, item => (
        <Menu.Item key={item.id} onClick={item.onClick}>
          <Text>{item.text}</Text>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div ref={containerRef} className={className}>
      <Dropdown
        overlay={menu}
        placement='bottomRight'
        getPopupContainer={_ => containerRef.current}
        arrow
        // trigger='click' // ask TONCO for help
      >
        <StyledButton icon={<BarsOutlined />} type='text' shape='circle-outline' />
      </Dropdown>
    </div>
  )
}

export default ContextMenu
