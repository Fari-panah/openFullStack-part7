import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </QueryClientProvider>
)