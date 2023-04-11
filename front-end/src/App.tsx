import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Root from './components/Root';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import ErrorPage from './pages/ErrorPage';
import Product from './pages/ProductPage';
import ProductList from './components/admin/product/Product';
import ProductDetails from './components/admin/product/ProductDetails';
import ProductAdd from './components/admin/product/ProductAdd';
import ProductUpdate from './components/admin/product/ProductUpdate';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path='/' element={<Root />} >
        <Route path='products' element={<Product />} />
        <Route path='login' element={<AuthPage path={"login"} />} />
        <Route path='register' element={<AuthPage path={"register"} />} />
      </Route>
      <Route path='admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>}>
        <Route path='products' element={<ProductList />} />
        <Route path='products/:id' element={<ProductDetails />} />
        <Route path='products/add' element={<ProductAdd />}/>
        <Route path='products/:id/update' element={<ProductUpdate />}/>
      </Route>
    </Route>  
  )
);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;