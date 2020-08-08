import React, { memo } from 'react'
import { map } from 'lodash'
import { Button, Tabs } from 'antd'
import styled from 'styled-components'
import { SmileTwoTone } from '@ant-design/icons'
import Popover from '../Popover'

import { smileys, gestures, food, symbols } from '../../assets/emoji'
import { StyledButton } from './styled/Chat.styled'

const StyledTabPane = styled(Tabs.TabPane)`
  overflow: auto;
  max-height: 50vh;
`

const EmojiList = memo(({ onSelect }) => {
  const getEmojiButtons = emojiList => {
    return map(emojiList, x => (
      <Button
        onClick={() => onSelect(x)}
        icon={<h6 style={{ fontSize: 25 }}>{x}</h6>}
        type='text'
        shape='circle'
      />
    ))
  }

  const tabs = (
    <Tabs defaultActiveKey='1' tabPosition='bottom' style={{ width: '50vw' }}>
      <StyledTabPane tab='Smileys' key='1'>
        {getEmojiButtons(smileys)}
      </StyledTabPane>
      <StyledTabPane tab='Gestures' key='2'>
        {getEmojiButtons(gestures)}
      </StyledTabPane>
      <StyledTabPane tab='Food' key='3'>
        {getEmojiButtons(food)}
      </StyledTabPane>
      <StyledTabPane tab='Symbols' key='4'>
        {getEmojiButtons(symbols)}
      </StyledTabPane>
    </Tabs>
  )

  return (
    <Popover placement='topLeft' content={tabs} trigger='click'>
      <StyledButton type='text' icon={<SmileTwoTone />} />
    </Popover>
  )
})

export default EmojiList
