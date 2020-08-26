import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MessagesLoadingSpinner = () => {
  return (
    <Wrapper>
      <Spin indicator={<LoadingOutlined />} />
    </Wrapper>
  )
}

export default MessagesLoadingSpinner
