import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/pages/notFound.css';
import { useLanguage } from '@hooks';

//* Will improve the UI for this pager later on!

export function NotFound() {
  const navigate = useNavigate();
  const { translations } = useLanguage();

  return (
    <div className="notFound">
      <h2>{translations.pageNotFound}</h2>
      <button
        onClick={() => navigate('/')}
        className="not-found"
      >
        {translations.home}
      </button>
    </div>
  );
}
