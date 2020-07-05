import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
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
  border-left: none;
  border-radius: 45px;
  margin-top: 20px;
  width: 80%;
  min-height: 43px;
  & img {
    border-radius: 50%;
    width: 45px;
    margin-right: 15px;
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
  }
`

export const Header = styled.div`
  font-size: 25px;
  border-bottom: solid 2px;
  margin: 15px 0;
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & i {
    cursor: pointer;
  }
`
