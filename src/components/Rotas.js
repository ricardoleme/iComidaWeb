import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom"
import Login from "../pages/Login"
import Menu from "../pages/Menu"
import Inicio from "../pages/Inicio"
import Categorias from "../pages/Categorias"
import Restaurantes from "../pages/Restaurantes"
import NaoEncontrado from "../pages/NaoEncontrado"
import RotasPrivadas from '../components/RotasPrivadas'


export default function Rotas(){
  return(
<HashRouter>
  <Switch>
    <Route exact path='/' component={Inicio} />
    <Route exact path='/login' component={Login} />
    <RotasPrivadas exact path='/menu' component={Menu} />
    <RotasPrivadas exact path='/categorias' component={Categorias} />
    <RotasPrivadas exact path='/restaurantes' component={Restaurantes} />
    <Route component={NaoEncontrado} />
  </Switch>
</HashRouter>
  )
}