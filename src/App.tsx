import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EstiloGlobal, { Container } from "./styles"

import store  from './store'
import { Provider } from "react-redux"
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'

const rotas = createBrowserRouter([{
  path: '/',
  element: <Home/>
},
{
  path: '/novo',
  element: <Cadastro/>

}])

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <EstiloGlobal/>
        <Container>
          <RouterProvider router={rotas} />
        </Container>
      </Provider>
    </div>
  )
}

export default App
