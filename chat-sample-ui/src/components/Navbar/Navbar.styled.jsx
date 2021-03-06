import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.primary};
  width: 100%;
  height: 55px;
  align-items: center;
  position: relative;
`

export const Logo = styled(Link)`
  font-size: 25px;
  padding: 10px 0 10px 30px;
  color: ${({ theme }) => theme.textPrimary};

  :hover {
    color: ${({ theme }) => theme.textPrimary};
  }
`

export const Links = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 30px;
`

export const NavbarLink = styled(Link)`
  text-decoration: none;
  margin: 0 12px 0 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.textPrimary};
  transition: transform 0.2s;

  :hover {
    transform: translateY(5px);
    color: ${({ theme }) => theme.textPrimary};
  }
`

export const ExpandedMenuLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  padding: 8px 20px;
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ theme }) => theme.primary};
  font-size: 20px;
  text-decoration: none;
  transition: all 0.2s ease;

  :hover {
    color: ${({ theme }) => theme.textPrimary};
    transform: translateX(-5px);
  }
`

export const ExpandedLinksWrapper = styled.div`
  top: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  background: ${({ theme }) => theme.primary};
`

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 33px;
  height: 33px;
  background: ${({ theme }) => theme.gray};
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
`

export const UserName = styled.p`
  color: ${({ theme }) => theme.white};
  padding-right: 16px;
  margin: 0;
`

export const Avatar = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  height: 33px;
`

export const SmallScreenAvatar = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  margin-left: auto;
  height: 33px;
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
`
