import React from 'react';
import { ContextProvider } from './Context';

import App from './App';

export default function Call() {
  return (
    <div>
      <ContextProvider>
        <App />
      </ContextProvider>
    </div>
  );
}
