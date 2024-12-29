import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Default from './Components/Default/Default.jsx'
import Home from './Components/Home/Home.jsx'
import Register from './Components/Authentication/Register/Register.jsx';
import AuthContextProvider, { AuthContext } from './Provider/AuthContextProvider.jsx';
import SignIn from './Components/Authentication/SignIn/SignIn.jsx';

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
        path:'/signIn',
        element:<SignIn></SignIn>
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
   <AuthContextProvider>
   <RouterProvider router={router}></RouterProvider>
   </AuthContextProvider>
  </StrictMode>,
)
