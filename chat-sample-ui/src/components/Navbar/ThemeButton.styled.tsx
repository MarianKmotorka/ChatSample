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
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s, transform 0.3s;

  :hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
`
