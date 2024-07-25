import React from 'react';
import { Button } from './Button';
import { UserComment } from './UserComment';
import { CommentInput } from './CommentInput';

type ICommentProps = {
  isComment: boolean;
  toggleComment: () => void;
  handleChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  comment: string;
};
export const Comment: React.FC<ICommentProps> = ({
  isComment,
  toggleComment,
  handleChangeComment,
  comment,
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
      <UserComment
        name="Adan"
        comment="TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest"
      />
      {isComment && (
        <React.Fragment>
          <CommentInput
            onChange={handleChangeComment}
            placeholder="Comment..."
            value={comment}
            name="Haris"
          />
          <Button
            type="button"
            className="send-comment-button"
            onClick={toggleComment}
          >
            Send
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
