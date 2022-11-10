import React, { useEffect } from 'react';
import { getCsrfCookie } from './api';
import Router from './router';

/**
 * 應用程式
 *
 * @returns
 */
export default function App() {
  /** init csrf cookie */
  useEffect(() => {
    getCsrfCookie();
  }, []);

  return (
    <Router />
  );
}
