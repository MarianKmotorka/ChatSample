import React from 'react'

// TODO: use TypeScript

const NameValueRowsContainer = ({ children, nameWidth = 0 }) => {
  return (
    <div>
      {React.Children.map(children, row => React.cloneElement(row, { nameWidth }))}
    </div>
  )
}

export default NameValueRowsContainer
