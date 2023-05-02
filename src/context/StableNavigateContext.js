import React, { createContext, useContext, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// TODO 未使用
const StableNavigateContext = createContext(null);

function StableNavigateContextProvider() {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  return (
    <StableNavigateContext.Provider value={navigateRef}>
      <Outlet />
    </StableNavigateContext.Provider>
  );
}

const useStableNavigate = () => {
  const navigateRef = useContext(StableNavigateContext);
  if (navigateRef.current === null) {
    throw new Error('StableNavigate context is not initialized');
  }

  return navigateRef.current;
};

export {
  StableNavigateContext,
  StableNavigateContextProvider,
  useStableNavigate,
};
