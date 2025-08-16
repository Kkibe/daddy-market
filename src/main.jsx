import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  </RecoilRoot>
)