import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import '../styles/index.css'
import App from './views/App'
import Layout from '../shared/components/Layout'
import Login from './views/Login';
import TransactionRegistry from './views/TransactionRegistry';
import Goals from './views/Goals';
import History from './views/History';
import Configurations from './views/Configurations';
import UserSettings from './views/UserSettings';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const container = document.getElementById('app');
if(!container){
  throw new Error("root not found. Check index.html");
}
const root = createRoot(container);

const router = createHashRouter([
  {
    path: '/',
    element: <Login/>,
    errorElement: <div>404 page not found</div>
  },

  {
    path: '/home',
    element: <Layout/>,
    errorElement: <div>404 page not found</div>, 

  children: [
    { index: true, element: <App/> },
    { path: 'transactionregistry', element: <TransactionRegistry/> },  
    { path: 'goals', element: <Goals/> },
    { path: 'history', element: <History/> },
    { path: 'configurations', element: <Configurations/> },
    { path: 'usersettings', element: <UserSettings/> }
  ]
    }
  ])

root.render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/#/home"
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>
);
