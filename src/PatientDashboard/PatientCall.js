import React from 'react';
import { ContextProvider } from './Context';

import App from './App';

export default function PatientCall() {
  return (
    <div>
      <ContextProvider>
        <App />
      </ContextProvider>
    </div>
  );
}
