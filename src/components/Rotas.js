import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom"
import Login from "../pages/Login"
import Inicio from "../pages/Inicio"
import NaoEncontrado from "../pages/NaoEncontrado"
import RotasPrivadas from '../components/RotasPrivadas'


export default function Rotas(){
  return(
<HashRouter>
  <Switch>
    <Route exact path='/' component={Login} />
    <Route exact path='/login' component={Login} />
    <RotasPrivadas exact path='/inicio' component={Inicio} />
    <Route component={NaoEncontrado} />
  </Switch>
</HashRouter>
  )
}