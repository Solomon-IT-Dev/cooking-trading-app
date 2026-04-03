import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppLayout } from '@/app/layout'
import { ExplorePage } from '@/modules/explore'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ index: true, element: <ExplorePage /> }],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
