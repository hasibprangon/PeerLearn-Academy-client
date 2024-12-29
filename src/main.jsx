import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Default from './Components/Default/Default.jsx'
import Home from './Components/Home/Home.jsx'
import Login from './Components/Authentication/Login/Login.jsx';
import Register from './Components/Authentication/Register/Register.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default></Default>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
