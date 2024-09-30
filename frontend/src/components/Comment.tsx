import React from 'react';
import { Button } from './Button';
import { UserComment } from './UserComponent';
import { CommentInput } from './CommentInput';
import { TComment, UserDto } from '@types';

type ICommentProps = {
  isComment: boolean;
  toggleComment: () => void;
  handleChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  comment: string;
  activeUser: UserDto;
  comments: TComment[];
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
  return (
    <React.Fragment>
      {' '}
      <Button
        type="button"
        className="new-comment-button"
        onClick={toggleComment}
      >
        New comment
      </Button>
      {comments.length ? (
        comments.map((comment) => (
          <UserComment
            name={comment.name}
            comment={comment.comment}
          />
        ))
      ) : (
        <div>
          <h4>No comments</h4>
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
            Send
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
