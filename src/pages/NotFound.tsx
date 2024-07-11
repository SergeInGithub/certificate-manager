import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      Page NotFound 🙃. Please head back{' '}
      <button onClick={() => navigate('/')}>HOME</button>
    </div>
  );
}
