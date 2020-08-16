import React from 'react'

const NameValueRowsContainer = ({ children, nameWidth }) => {
  return (
    <div>
      {React.Children.map(children, row => React.cloneElement(row, { nameWidth }))}
    </div>
  )
}

export default NameValueRowsContainer
