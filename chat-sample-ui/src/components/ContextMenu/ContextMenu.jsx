import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { map, get } from 'lodash'
import { Menu, Dropdown, Button } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const Text = styled.p`
  font-size: 15px;
  line-height: 20px;
`

const ContextMenu = ({ items, className }) => {
  const containerRef = useRef()

  const menu = (
    <Menu>
      {map(items, item => {
        const id = get(item, 'id')
        const text = get(item, 'text')
        const onClick = get(item, 'onClick')

        return (
          <Menu.Item key={id} onClick={onClick}>
            <Text>{text}</Text>
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <div ref={containerRef} className={className}>
      <Dropdown
        overlay={menu}
        placement='bottomCenter'
        trigger='click'
        getPopupContainer={() => containerRef.current}
        arrrow
      >
        <Button icon={<BarsOutlined />} type='text' shape='circle-outline' />
      </Dropdown>
    </div>
  )
}

ContextMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func
    })
  ).isRequired
}

export default ContextMenu
