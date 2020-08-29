import React, { useRef } from 'react'
import { map, isEmpty } from 'lodash'
import { Menu, Dropdown } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import Button from './Button'

interface ContextMenuItem {
  id: string
  text: string
  onClick: (e: any) => void
}

interface IProps {
  items: ContextMenuItem[]
  className?: string
}

const Text = styled.p`
  font-size: 15px;
  line-height: 20px;
`

const ContextMenu: React.FC<IProps> = ({ items, className }) => {
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
        <Button icon={<BarsOutlined />} shape='circle-outline' />
      </Dropdown>
    </div>
  )
}

export default ContextMenu
