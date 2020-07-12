import React from 'react'
import PropTypes from 'prop-types'
import { map, get } from 'lodash'
import { Menu, Dropdown, Button } from 'antd'
import { BarsOutlined } from '@ant-design/icons'

const ContextMenu = ({ items }) => {
  const menu = (
    <Menu>
      {map(items, item => {
        const id = get(item, 'id')
        const text = get(item, 'text')
        const onClick = get(item, 'onClick')

        return (
          <Menu.Item key={id} onClick={onClick}>
            <p>{text}</p>
          </Menu.Item>
        )
      })}
    </Menu>
  )

  // TODO fix button is unable to be clicked after one use

  return (
    <Dropdown overlay={menu} placement='bottomCenter' trigger='click'>
      <Button icon={<BarsOutlined />} type='text' />
    </Dropdown>
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
