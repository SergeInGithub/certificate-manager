import React from 'react';
import { Button } from './Button';
import { UserComment } from './UserComponent';
import { CommentInput } from './CommentInput';
import { CommentDto, UserDto } from '@types';
import { useLanguage, useUser } from '@hooks';
import { getUserName } from '@utils';

type ICommentProps = {
  isComment: boolean;
  toggleComment: () => void;
  handleChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  comment: string;
  activeUser: UserDto;
  comments: CommentDto[];
  handleCommentSubmit: () => void;
};

export const Comment: React.FC<ICommentProps> = ({
  isComment,
  toggleComment,
  handleChangeComment,
  comment,
  activeUser,
  comments,
  handleCommentSubmit,
}) => {
  const { translations } = useLanguage();
  const { users } = useUser();

  return (
    <React.Fragment>
      <Button
        type="button"
        className="new-comment-button"
        onClick={toggleComment}
      >
        {isComment ? `${translations.cancel}` : `${translations.newComment}`}
      </Button>

      {comments.length ? (
        comments.map((comment) => (
          <UserComment
            key={comment.id}
            name={getUserName(comment.userId, users)}
            comment={comment.comment}
          />
        ))
      ) : (
        <div>
          <h4>{translations.noComments}</h4>
        </div>
      )}

      {isComment && (
        <React.Fragment>
          <CommentInput
            onChange={handleChangeComment}
            placeholder="Comment..."
            value={comment}
            name={activeUser.firstName}
          />
          <Button
            type="button"
            className="send-comment-button"
            onClick={handleCommentSubmit}
          >
            {translations.send}
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
