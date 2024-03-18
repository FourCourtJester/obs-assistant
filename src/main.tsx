// Import core components
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import our components
import App from './app'

const root = createRoot(document.getElementById('app') as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
