import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import '../styles/index.css'
import App from './App'
import Layout from '../shared/components/Layout'
import Login from './Login';
import TransactionRegistry from './TransactionRegistry';
import Goals from './Goals';
import History from './History';
import Configurations from './Configurations';
import UserSettings from './UserSettings';

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
    { path: 'transactionregistry', element: <TransactionRegistry/> },  // ← sin /
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
