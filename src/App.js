import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./components/RotasPrivadas";

import Inicio from "./components/Inicio";
import Login from "./components/Login";
import NovoUsuario from "./components/NovoUsuario";
import NaoEncontrado from "./components/NaoEncontrado"

const App = () => {
  return (
      <BrowserRouter>
        {/* Switch garante que apenas uma rota será renderizada exclusivamente */ }
        <Switch> 
          <PrivateRoute exact path="/" component={Inicio} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/novousuario" component={NovoUsuario} />
          <Route path="*" component={NaoEncontrado} />          
        </Switch>
      </BrowserRouter>
  );
};

export default App;