import React from 'react';
import internal from 'stream';

type ContextProps = { 
  name: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  subscriptionId: string,
};

export const AppContext = 
  React.createContext<Partial<ContextProps>>({});