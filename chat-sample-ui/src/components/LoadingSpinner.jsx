import React from 'react'
import styled from 'styled-components'
import colors from '../utils/colors.json'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${colors.ternary};
`

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <i className='fa fa-cog fa-3x fa-spin' />
    </Wrapper>
  )
}

export default LoadingSpinner
