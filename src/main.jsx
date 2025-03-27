import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './css/style.css'

import App from './App'

createRoot(document.getElementById('wrapper')).render(
  <StrictMode>

    <App />

  </StrictMode>,
)
