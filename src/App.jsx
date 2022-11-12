import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import ErrorPage from './error-page'

import Threads from './Threads'
import New from './New'
import Root from './routes/root'
import Thread from './Thread'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Threads />
      },
      {
        path: '/thread/new',
        element: <New />
      },
      {
        path: '/thread/:threadId',
        element: <Thread />
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
