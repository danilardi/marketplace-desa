import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PrimeReactProvider } from 'primereact/api'


import '@flaticon/flaticon-uicons/css/all/all.css'
import './assets/css/index.css'
import './assets/css/product.css'
import './assets/css/navbar.css'
import './assets/css/cart.css'

// primreact css
import "primeicons/primeicons.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: false }}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
)
