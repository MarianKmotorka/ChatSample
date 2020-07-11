import styled from 'styled-components'

export const Wrapper = styled.div`
  width: ${({ width }) => width || '100%'};
  position: relative;
`

export const Header = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  border: 1.5px solid ${({ theme }) => theme.blackCoffee};
  border-radius: 3px;
`

export const ArrowWrapper = styled.div`
  min-height: 100%;
  width: 40px;
  color: ${({ theme }) => theme.red};
  background: ${({ theme }) => theme.white};
  border-top-right-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Expander = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;

  position: absolute;
  top: 100%;

  padding: 10px 0px 5px 0px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;

  width: 100%;
  font-weight: 300;
  color: ${({ theme }) => theme.black};

  background: ${({ theme }) => theme.white};
`

export const Item = styled.div`
  padding: 2px 10px;
  display: flex;
  align-items: center;
  font-size: 18px;

  &:hover {
    background: ${({ theme }) => theme.lighGray};
  }
`

export const LoadingItem = styled(Item)`
  height: 80px;
  justify-content: center;
  color: blue;

  &:hover {
    background-color: transparent;
  }
`

export const Error = styled.p`
  color: ${({ theme }) => theme.red};
`

export const Input = styled.input`
  padding: 5px;
  font-size: 18px;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-top-left-radius: 3px;
  background: ${({ theme }) => theme.white};

  &:focus {
    outline: none;
  }
`
