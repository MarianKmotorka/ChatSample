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
  flex: 3;
  padding: 10px 0 10px 30px;
  color: ${colors.secondary};
`

export const Links = styled.div`
  flex: 1;
  display: flex;
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
