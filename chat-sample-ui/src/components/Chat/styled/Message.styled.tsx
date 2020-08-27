import styled from 'styled-components'
import { Button } from 'antd'
import { getMessageBorderRadius } from '../utils'
import { MD } from '../../../utils/useWindowSize'
import { MessageShape } from '../Message'

interface IProps {
  isMyMessage: boolean
  shape: MessageShape
}

export const InnerWrapper = styled.div<IProps>`
  display: flex;
  align-items: center;
  margin: 3px;
  max-width: 70%;
  justify-content: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};

  margin-left: ${({ isMyMessage }) => (isMyMessage ? 'auto' : '5px')};
  margin-top: ${({ shape }) => (shape === 'top' || shape === 'standalone' ? '20px' : 0)};

  @media only screen and (max-width: ${`${MD}px`}) {
    max-width: 85%;
  }
`

export const MessageInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  font-size: 17px;
`

export const Text = styled.p<IProps>`
  font-size: 15px;
  line-height: 20px;
  padding: 6px 17px;
  word-break: break-word;
  border-radius: ${props => getMessageBorderRadius(props.isMyMessage, props.shape)};
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ isMyMessage, theme }) => (isMyMessage ? theme.primary : theme.bg300)};
`

export const Avatar = styled.img<{ isHidden: boolean }>`
  margin: 0 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`

export const MessageDate = styled.p`
  font-size: 12px;
  font-style: italic;
  margin-left: auto;
`

export const StyledButton = styled(Button)<{ hover_color: string; opacity: number }>`
  opacity: ${({ opacity = 1 }) => opacity};
  color: ${({ theme }) => theme.textPrimary};
  :hover {
    color: ${({ theme, hover_color }) => theme[hover_color] || theme.textPrimary};
  }
`

export const DeletedText = styled.i`
  color: ${({ theme }) => theme.textPrimary};
  margin: 0;
  padding: 0;
`
