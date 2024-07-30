import React from 'react';

type TUserComment = {
  name: string;
  comment: string;
};

export const UserComment: React.FC<TUserComment> = ({ name, comment }) => {
  return (
    <div className="user-comment-container">
      <section className="user-comment-name-section">
        <strong>User:&nbsp;</strong>
        <span className="userComment-name">{name}</span>
      </section>
      <section className="user-comment-comment-section">
        <strong>Comment:&nbsp;</strong>
        <p className="comment-paragraph">{comment}</p>
      </section>
    </div>
  );
};
