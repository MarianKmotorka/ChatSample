import React, { useContext } from 'react'
import { useTheme } from 'styled-components'
import { BgColorsOutlined } from '@ant-design/icons'

import Popover from '../Popover'
import { Switch } from 'antd'
import { ThemeContext } from '../../contextProviders'
import {
  StyledButton,
  ContentWrapper,
  ColorOption,
  Label,
  Container
} from './ThemeButton.styled'

const ThemeButton: React.FC = () => {
  const theme = useTheme()
  const { toggleTheme, pickColor } = useContext(ThemeContext)

  const content = (
    <ContentWrapper>
      <Container>
        <Label>Toggle theme</Label>
        <Switch checked={theme.isDarkTheme} onChange={toggleTheme} />
      </Container>

      <Container>
        <Label>Pick color</Label>
        <ColorOption bg={theme.blue} onClick={_ => pickColor(theme.blue)} />
        <ColorOption bg={theme.red} onClick={_ => pickColor(theme.red)} />
        <ColorOption bg={theme.green} onClick={_ => pickColor(theme.green)} />
      </Container>
    </ContentWrapper>
  )

  return (
    <Popover placement='topLeft' content={content} trigger='click'>
      <StyledButton icon={<BgColorsOutlined />} bg='transparent' shape='circle' />
    </Popover>
  )
}

export default ThemeButton
