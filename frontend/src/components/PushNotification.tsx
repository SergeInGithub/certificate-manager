import React, { useEffect } from 'react';

interface IPushNotificationProps {
  message: string;
  onClose: () => void;
}

const PushNotification = ({ message, onClose }: IPushNotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="push-notification">
      <p>{message}</p>
    </div>
  );
};

export default PushNotification;
