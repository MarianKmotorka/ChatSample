import styled from 'styled-components'

export const Wrapper = styled.div`
  width: ${({ width }) => width || '100%'};
  position: relative;
`

export const Header = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  border-radius: 3px;
`

export const ArrowWrapper = styled.div`
  min-height: 100%;
  width: 40px;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.bg100};
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
  max-height: 350px;
  overflow-y: auto;

  position: absolute;
  top: 100%;

  padding: 10px 0px 5px 0px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;

  width: 100%;
  color: ${({ theme }) => theme.text};

  background: ${({ theme }) => theme.bg100};
`

export const Item = styled.div`
  padding: 2px 10px;
  display: flex;
  align-items: center;
  font-size: 18px;

  &:hover {
    background: ${({ theme }) => theme.bg300};
  }
`

export const LoadingItem = styled(Item)`
  height: 80px;
  justify-content: center;
  color: ${({ theme }) => theme.primary};

  &:hover {
    background-color: transparent;
  }
`

export const Error = styled.p`
  color: ${({ theme }) => theme.red};
`

export const Input = styled.input`
  padding: 5px 10px;
  font-size: 18px;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-top-left-radius: 3px;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg100};

  &:focus {
    outline: none;
  }
`
