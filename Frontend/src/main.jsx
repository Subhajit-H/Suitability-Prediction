import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ShopProvider } from './context/ShopProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopProvider>
    <App />
  </ShopProvider>
  </BrowserRouter>,
)
