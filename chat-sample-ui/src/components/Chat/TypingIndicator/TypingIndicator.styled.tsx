import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 10px 10px;
  justify-content: flex-start;
`

const TYPING = keyframes`
    0% {
      -webkit-transform: translateY(0px);
    }
    28% {
      -webkit-transform: translateY(-5px);
    }
    44% {
      -webkit-transform: translateY(0px);
    }
  }
`

export const Dot = styled.div`
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bg500};
  -webkit-animation: ${TYPING} 1.5s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: 200ms;
    -webkit-animation-delay: 200ms;
  }
  &:nth-child(2) {
    animation-delay: 300ms;
    -webkit-animation-delay: 300ms;
  }
  &:nth-child(3) {
    animation-delay: 400ms;
    -webkit-animation-delay: 400ms;
  }
`

export const Photo = styled.img<{ shiftLeft: number }>`
  height: 30px;
  border-radius: 35px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  transform: ${({ shiftLeft }) => `translateX(${-shiftLeft}px)`};
`

export const DotsWrapper = styled.div<{ shiftLeft: number }>`
  display: flex;
  align-items: center;
  padding: 6px 17px;
  margin-left: 5px;
  height: 30px;
  border-radius: 25px;
  background: ${({ theme }) => theme.bg200};
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  transform: ${({ shiftLeft }) => `translateX(${-shiftLeft}px)`};

  * + * {
    margin-left: 4px;
  }
`
