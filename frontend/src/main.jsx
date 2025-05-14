import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import {RecoilRoot} from 'recoil'
import {BrowserRouter} from 'react-router-dom'
import Skillcontext from './view/components/skillcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <ChakraProvider>
    <RecoilRoot>
      <Skillcontext>
      <App />
      </Skillcontext>
    </RecoilRoot>
  </ChakraProvider>
  </BrowserRouter>
  </StrictMode>,
)
