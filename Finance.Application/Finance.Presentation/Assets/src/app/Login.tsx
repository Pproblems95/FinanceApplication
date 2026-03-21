
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Login(){
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
   if (!isLoading && !isAuthenticated) {
     loginWithRedirect();
   }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
   return <div>Cargando...</div>;
  }

  if (isAuthenticated) {
    Navigate({ to: "/#/home" });
  }

  return (
    <div>
      <h1>Bienvenido a la aplicación</h1>
    </div>
  );
}

export default Login