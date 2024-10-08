import { useLanguage } from '@hooks';
import React from 'react';

interface AlertProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const { translations } = useLanguage();

  return (
    <div className="alert-overlay">
      <div className="alert-content">
        <h2 className="alert-title">{translations.waitASec}</h2>
        <p className="alert-message">{message}</p>
        <div className="alert-actions">
          <button
            className="btn-soft btn-confirm-soft"
            onClick={onConfirm}
          >
            {translations.delete}
          </button>
          <button
            className="btn-soft btn-cancel-soft"
            onClick={onCancel}
          >
            {translations.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
