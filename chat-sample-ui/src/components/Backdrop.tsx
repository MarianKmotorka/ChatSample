import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

export const PortalBackdrop: React.FC = ({ children }) =>
  createPortal(<Wrapper>{children}</Wrapper>, document.getElementById('portal')!)

export default Wrapper
