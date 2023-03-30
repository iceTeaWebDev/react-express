import {Routes, Route, RouterProvider, createBrowserRouter} from 'react-router-dom'
import Root from './components/Root'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import ErrorPage from './pages/ErrorPage'
import Product from './pages/Product'
import { checkAuthLoader } from './util/auth'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'products',
        element: <Product />
      },
      {
        path: 'login',
        element: <Auth />
      },
      {
        path: 'admin',
        element: <Admin />,
        loader: checkAuthLoader
      }
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
