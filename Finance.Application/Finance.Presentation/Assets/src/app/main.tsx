import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../styles/index.css'
import App from './App'
import Layout from '../shared/components/Layout'
import Login from './Login';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const container = document.getElementById('app');
if(!container){
  throw new Error("root not found. Check index.html");
}
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
    errorElement: <div>404 page not found</div>
  },

  {
    element: <Layout/>,
    errorElement: <div>404 page not found</div>, 

    children: [
      {
        path: '/home',
        element: <App/>
      }
    ]
  }
])

console.log(window.location.origin + "/home")

root.render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/home"
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>
);
