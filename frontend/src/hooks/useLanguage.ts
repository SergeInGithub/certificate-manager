import React, { useContext } from 'react';
import { LanguageContext, TLanguageContextProps } from '@types';

export const useLanguage = (): TLanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
