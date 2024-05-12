import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'


ReactDOM.createRoot(document.getElementById('root')).render(

  <Router>
    <RecoilRoot>

      <ChakraProvider >
          <App />

      </ChakraProvider>
    </RecoilRoot>
  </Router>
)
