import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

// Arquivo de Roteamento da página, com o
// react-router-dom

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'

// Criando meu componente de roteamento
const Routes= () => {
  // Para acessar, coloco os argumentos:
  // component = componente a ser renderizado
  // path = caminho para a página ser acessada
  // exact = caminho igual ao descrito
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact/>
      <Route component={CreatePoint} path="/create-point"/>
    </BrowserRouter>
  )
}

export default Routes