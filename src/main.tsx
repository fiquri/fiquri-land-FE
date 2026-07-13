import React from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'features/auth'
import App from 'App'
import 'shared/styles/global.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
