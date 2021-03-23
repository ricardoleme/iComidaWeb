import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const RotasPrivadas = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("access_token") 
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  export default RotasPrivadas