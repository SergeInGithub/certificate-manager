import { Language, LanguageOptions, LanguageContext } from '@types';
import React, { useCallback, useEffect, useState } from 'react';

interface LanguageProviderProps {
  children: React.ReactNode;
}

const languageFileMapping = {
  [LanguageOptions.ENGLISH]: 'en',
  [LanguageOptions.GERMAN]: 'de',
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(LanguageOptions.ENGLISH);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const loadTranslations = useCallback(async (lang: Language) => {
    const fileName = languageFileMapping[lang];
    const response = await import(`../data/${fileName}.json`);
    setTranslations(response.default);
  }, []);

  useEffect(() => {
    loadTranslations(language);
  }, [language, loadTranslations]);

  const value = {
    language,
    setLanguage,
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
