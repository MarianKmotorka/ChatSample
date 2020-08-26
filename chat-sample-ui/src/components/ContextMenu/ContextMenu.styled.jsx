import styled from 'styled-components'
import { Button } from 'antd'

export const Text = styled.p`
  font-size: 15px;
  line-height: 20px;
`
export const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.textPrimary};
  :hover,
  :focus {
    color: ${({ theme }) => theme.textPrimary};
  }
`
