import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomeLayout from './layouts/HomeLayout'
import Login from './components/Login'
import Register from './components/Register'
import DashBoardLayout from './layouts/DashBoardLayout'
import Blank from './components/Blank'
import AdminDash from './components/AdminDash'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/dash',
    element: <DashBoardLayout />,
    children: [
      { index: true, element: <Blank /> },
      {
        path: 'admin',
        element: <AdminDash />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
