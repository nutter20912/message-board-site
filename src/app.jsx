import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { routes } from './routes';

/**
 * 應用程式
 *
 * @returns
 */
export default function App() {
  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}
