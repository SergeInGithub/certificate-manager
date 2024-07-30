import React from 'react';
import { Label } from './Label';

interface ICommentInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  placeholder: string;
}

export const CommentInput: React.FC<ICommentInputProps> = ({
  name,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <section className="comment-input-container">
      <Label className="user-comment-name-label">{name}*</Label>

      <textarea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        rows={7}
        className="comment-text-area"
      />
    </section>
  );
};
