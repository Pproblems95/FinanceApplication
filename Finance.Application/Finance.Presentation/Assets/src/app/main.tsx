import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../styles/index.css'
import App from './App'
import Layout from '../shared/components/Layout'
import Login from './Login';

const container = document.getElementById('app');

if(!container){
  console.log(container)
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

root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
