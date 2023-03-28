import './index.css'
import App from './App'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import {AuthContextProvider} from './store/authContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <meta http-equiv="Content-Security-Policy"
            content="default-src https: 'unsafe-inline' 'unsafe-eval'" />
    <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
)
