import styled from 'styled-components'
import colors from '../../../utils/colors.json'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 300px;
  background: linear-gradient(0deg, ${colors.secondary}, ${colors.ternary});
  border-left: solid 2px ${colors.main};
  padding: 0px 10px;
`

export const ParticipantWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: solid 1.5px ${colors.main};
  border-left: none;
  border-radius: 45px;
  margin-top: 20px;
  width: 80%;
  background: ${colors.ternary};
  & img {
    border-radius: 50%;
    width: 45px;
    margin-right: 15px;
  }
`

export const Header = styled.div`
  font-size: 25px;
  border-bottom: solid 2px;
  color: ${colors.main};
  margin: 15px 0;
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & i {
    cursor: pointer;
  }
`
