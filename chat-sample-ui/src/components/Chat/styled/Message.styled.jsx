import styled from 'styled-components'
import { getMessageBorderRadius } from '../utils'
import { MessageShape } from '../Message'
import { MD } from '../../../utils/useWindowSize'
import { Button } from 'antd'

export const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1px;
  max-width: 55%;
  color: ${({ theme }) => theme.black};
  justify-content: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};

  margin-left: ${({ isMyMessage }) => (isMyMessage ? 'auto' : '5px')};
  margin-top: ${({ shape, isMyMessage }) =>
    (shape === MessageShape.TOP || shape === MessageShape.STANDALONE) && !isMyMessage
      ? '40px'
      : 0};

  @media only screen and (max-width: ${`${MD}px`}) {
    max-width: 80%;
  }
`

export const MessageInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  font-size: 17px;
`

export const Text = styled.p`
  font-size: 17px;
  line-height: 20px;
  padding: 4px 12px;
  border: 1px grey solid;
  word-break: break-word;
  border-radius: ${props => getMessageBorderRadius(props)};
  background: ${({ isMyMessage, theme }) => (isMyMessage ? theme.gold : theme.white)};
`

export const Avatar = styled.img`
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

export const ActionButton = styled(Button)`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`

export const DeletedText = styled.i`
  color: ${({ theme }) => theme.dimGray};
  margin: 0;
  padding: 0;
`
