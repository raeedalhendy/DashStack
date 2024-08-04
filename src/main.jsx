import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUpPage from './Page/SignUpPage.jsx'
import LoginPage from './Page/LoginPage.jsx'
import HomePage from './Page/HomePage.jsx'
import Favorite from './Page/Favorite.jsx'
import Products from './Page/Products.jsx'
import Welcome from './Page/Welcome.jsx'
import CreateProductPage from './Page/CreateProductPage.jsx'
import { ToastContainer } from 'react-toastify'
import OrderList from './Page/OrderList.jsx'
import EditProduct from './Page/EditProduct.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element : <Welcome/>
  },
  {
    path : "/LogIn" , element : <LoginPage />
  },
  {
    path : "/SignUp" , element : <SignUpPage />
  },
  {
    path : "/home" , element : <HomePage />,
    children: [
      {
        path : "/home/products" ,
        element: <Products/>
        
      },
      {
        path:"/home/favorite",
        element: <Favorite/>
      },
      {
        path:"/home/orderlist",
        element: <OrderList/>
      },
      {
        path : "/home/products/CreateProduct" ,
        element: <CreateProductPage/>
      },
      {
        path: "/home/products/EditProduct/:id",
    element: <EditProduct />,
      }
      
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode> 
      <ToastContainer/>
      <RouterProvider router={router} />
    </React.StrictMode>,
)
