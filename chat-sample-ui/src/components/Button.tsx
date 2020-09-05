import { Button } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)<{ color?: string; bg?: string; text?: boolean }>`
  border: none;
  color: ${({ theme, color, text }) =>
    (color && theme[color]) || theme[text ? 'text' : 'black']};

  background: ${({ theme, bg, text }) =>
    (bg && theme[bg]) || theme[text ? 'transparent' : 'white']};

  box-shadow: ${({ text }) => (text ? 'none' : '0 5px 5px rgba(0, 0, 0, 0.3)')};

  :hover,
  :focus {
    background: ${({ theme, bg, text }) =>
      (bg && theme[bg]) || theme[text ? 'transparent' : 'white']};

    color: ${({ theme, color, text }) =>
      (color && theme[color]) || theme[text ? 'text' : 'black']};
  }
`

export default StyledButton
