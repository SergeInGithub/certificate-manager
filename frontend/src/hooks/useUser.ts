import React, { useContext } from 'react';
import { TUserContext, UserContext } from '@types';

export const useUser = (): TUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
