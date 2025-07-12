import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import GlobalStyle from './GlobalStyle';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <GlobalStyle />
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </Router>
  </StrictMode>,
)
