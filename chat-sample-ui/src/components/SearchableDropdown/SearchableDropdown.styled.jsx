import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 300px;
  position: relative;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  border: none;
  background: rgba(256, 256, 256, 0.2);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`

export const ArrowWrapper = styled.div`
  height: 100%;
  text-align: center;
  width: 40px;
`

export const Expander = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0px 5px 0px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  position: absolute;
  top: 100%;
  width: 100%;
  background: rgba(256, 256, 256, 0.9);
  z-index: 10;
  font-weight: 300;
`

export const Item = styled.div`
  padding: 2px 10px;
  display: flex;
  align-items: center;
  font-size: 18px;

  &:hover {
    background-color: #ddd;
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
  color: red;
`

export const Input = styled.input`
  padding: 5px;
  font-size: 18px;
  width: 100%;
  outline: none;
  border: none;
  background: rgba(256, 256, 256, 0.2);
  border-top-left-radius: 8px;

  &:focus {
    outline: none;
  }
`
