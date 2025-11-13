import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from '@workspace/auth'
import App from './App'
import '@workspace/ui/styles'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
