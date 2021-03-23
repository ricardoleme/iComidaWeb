import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom"
import Login from "../pages/Login"
import Inicio from "../pages/Inicio"
import NaoEncontrado from "../pages/NaoEncontrado"
import MenuInicial from '../pages/MenuInicial'
import RotasPrivadas from '../components/RotasPrivadas'


export default function Rotas(){
  return(
<HashRouter>
  <Switch>
    <Route exact path='/' component={Inicio} />
    <Route exact path='/login' component={Login} />
    <RotasPrivadas exact path='/menu' component={MenuInicial} />
    <Route component={NaoEncontrado} />
  </Switch>
</HashRouter>
  )
}