import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../src/utils/index.js"

import '@flaticon/flaticon-uicons/css/all/all.css'
import './assets/css/index.css'
import './assets/css/product.css'
import './assets/css/navbar.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
