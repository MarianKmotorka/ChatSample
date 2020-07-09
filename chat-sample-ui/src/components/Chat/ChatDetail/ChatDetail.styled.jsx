import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.shadeWhite};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 300px;
  padding: 0px 10px;
`

export const ParticipantWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  width: 80%;

  & img {
    border-radius: 50%;
    width: 35px;
    margin-right: 10px;
  }

  & p {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
  }

  & i {
    width: 20px;
    height: 20px;
    padding-top: 3px;
    text-align: center;
    border-radius: 50%;
    margin-left: auto;
    margin-right: 15px;
    cursor: pointer;
    transition: all 0.1s ease;

    &:hover {
      color: ${({ theme }) => theme.red};
      transform: scale(1.3);
    }
  }
`

export const Header = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 25px;
  border-bottom: solid 2px ${({ theme }) => theme.red};
  margin: 15px 0;
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & i {
    cursor: pointer;
  }
`
