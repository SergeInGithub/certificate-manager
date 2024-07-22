import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/pages/notFound.css';

//* Will improve the UI for this pager later on!

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <h2>Page NotFound 🙃. Please head back </h2>
      <button onClick={() => navigate('/')}>HOME</button>
    </div>
  );
}
