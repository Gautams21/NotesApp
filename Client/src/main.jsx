import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <div data-theme='light'>
    <App />
    <ToastContainer position="bottom-right"
   bodyClassName={() => "text-gray-900 font-bold flex items-center"}/>
    </div>
  </StrictMode>,
)
