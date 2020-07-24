import styled from 'styled-components'
import { getMessageBorderRadius } from '../utils'
import { MessageShape } from '../Message'

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 2px;
  max-width: 55%;

  justify-content: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
  margin-left: ${({ isMyMessage }) => (isMyMessage ? 'auto' : '5px')};

  color: ${({ theme }) => theme.black};

  @media only screen and (max-width: 650px) {
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
  border-radius: ${props => getMessageBorderRadius(props)};
  margin-bottom: ${({ shape }) => (shape === MessageShape.BOTTOM ? '10px' : 0)};
  word-break: break-all;

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
