import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Default from './Components/Default/Default.jsx'
import Home from './Components/Home/Home.jsx'
import Register from './Components/Authentication/Register/Register.jsx';
import AuthContextProvider, { AuthContext } from './Provider/AuthContextProvider.jsx';
import SignIn from './Components/Authentication/SignIn/SignIn.jsx';
import Error from './Components/Error/Error.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import CreateAssignment from './Components/CreateAssignment/CreateAssignment.jsx';
import Assignments from './Components/Assignments/Assignments.jsx';
import ViewAssignments from './Components/ViewAssignments/ViewAssignments.jsx';
import MySubmittedAssignment from './Components/MySubmittedAssignment/MySubmittedAssignment.jsx';
import PendingAssignments from './Components/PendingAssignments/PendingAssignments.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default></Default>,
    errorElement:<Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path:'/assignments',
        element:<Assignments></Assignments>,
        loader: () => fetch(`http://localhost:5000/assignments`)
      },
      {
        path:'/mySubmission',
        element:<PrivateRoute><MySubmittedAssignment></MySubmittedAssignment></PrivateRoute>
      },
      {
        path:'/viewAssignments/:id',
        element:<PrivateRoute><ViewAssignments></ViewAssignments></PrivateRoute>,
        loader:({params}) => fetch(`http://localhost:5000/assignments/${params.id}`)
      },
      {
        path:'/createAssignment',
        element:<PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
      },
      {
        path:'/pendingAssignments',
        element:<PrivateRoute><PendingAssignments></PendingAssignments></PrivateRoute>
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
