import styled from 'styled-components'
import colors from '../../utils/colors.json'

export const Wrapper = styled.div`
  display: flex;
  background: ${colors.main};
  width: 100%;
  height: 8vh;
  align-items: center;
`

export const Logo = styled.div`
  font-size: 25px;
  padding: 10px 0 10px 30px;
  color: ${colors.secondary};
`

export const Links = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 30px;

  & a {
    text-decoration: none;
    margin: 0 12px;
    font-size: 20px;
    color: ${colors.secondary};
    transition: transform 0.2s;
    &:hover {
      transform: translateY(5px);
    }
  }
`

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  border-radius: 30px;
  background: ${colors.secondary};

  & > p {
    color: ${colors.mainDark};
    padding-right: 7px;
  }

  & > img {
    border-radius: 50%;
    margin-right: 5px;
    width: 30px;
  }
`
