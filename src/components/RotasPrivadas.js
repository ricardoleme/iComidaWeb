import React from "react";
import { Route, Redirect } from "react-router-dom";

const RotasPrivadas = ({ component: RouteComponent, ...rest }) => {
  const {usuarioAtual} = 'oi'
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!usuarioAtual ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default RotasPrivadas