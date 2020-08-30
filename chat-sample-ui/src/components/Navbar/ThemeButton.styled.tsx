import styled from 'styled-components'
import Button from '../Button'

export const StyledButton = styled(Button)`
  margin-left: 10px;
`

export const ContentWrapper = styled.div`
  .ant-switch {
    background-color: ${({ theme }) => theme.lightGray};
    }
  }

  .ant-switch-checked {
    background-color: ${({ theme }) => theme.gray};
  }
`

export const Label = styled.span`
  margin-right: 10px;
`

export const ColorOption = styled.div<{ bg: string }>`
  height: 30px;
  width: 30px;
  background: ${({ bg }) => bg};
  border-radius: 50%;
  margin-left: 10px;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
`
