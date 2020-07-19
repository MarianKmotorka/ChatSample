import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import App from './App.jsx'
import theme from './utils/theme'

import 'antd/dist/antd.css'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
)
