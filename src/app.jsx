import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { routes } from './routes';
import { getCsrfCookie } from './api';
/**
 * 應用程式
 *
 * @returns
 */
export default function App() {
  const router = createBrowserRouter(routes);

  /** init csrf cookie */
  useEffect(() => {
    getCsrfCookie();
  }, []);

  return (
    <RouterProvider router={router} />
  );
}
