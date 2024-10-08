import { useLanguage } from '@hooks';
import React from 'react';

type TUserComment = {
  name: string;
  comment: string;
};

export const UserComment: React.FC<TUserComment> = ({ name, comment }) => {
  const { translations } = useLanguage();

  return (
    <div className="user-comment-container">
      <section className="user-comment-name-section">
        <strong>{translations.activeUser}:&nbsp;</strong>
        <span className="userComment-name">{name}</span>
      </section>
      <section className="user-comment-comment-section">
        <strong>{translations.comment}:&nbsp;</strong>
        <p className="comment-paragraph">{comment}</p>
      </section>
    </div>
  );
};
