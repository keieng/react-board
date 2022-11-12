import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import ErrorPage from './error-page'

import Thread from './Thread'
import New from './New'
import Root from './routes/root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Thread />
      },
      {
        path: '/thread/new',
        element: <New />
      }
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
