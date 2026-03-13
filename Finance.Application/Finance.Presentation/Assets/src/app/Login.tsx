import * as React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react';

function Login(){
  //const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
//
  //useEffect(() => {
  //  if (!isLoading && !isAuthenticated) {
  //    loginWithRedirect();
  //  }
  //}, [isLoading, isAuthenticated, loginWithRedirect]);
//
  //if (isLoading) {
  //  return <div>Cargando...</div>;
  //}

  return (
    <div>
      <h1>Bienvenido a la aplicación</h1>
    </div>
  );
}

export default Login