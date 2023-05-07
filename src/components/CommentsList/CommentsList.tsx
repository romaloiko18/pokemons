import React, { FC, memo } from 'react';
import { useUser } from '../../context/user';
import Spinner from '../Spinner';
import Comment from './Comment';
import type { Comment as CommentType } from '../../types/comment';

type Props = {
  comments: CommentType[];
};
const CommentsList: FC<Props> = ({ comments }) => {
  const { user } = useUser();

  return !user ? (
    <Spinner />
  ) : (
    <div className="d-flex flex-column gap-3" style={{ maxHeight: 400, overflow: 'auto' }}>
      {reverseCommentsArray(comments).map((comment) => (
        <Comment date={comment.createdAt} email={comment.user.email} content={comment.content} isRight={user._id === comment.user._id} />
      ))}
    </div>
  );
};

export default memo(CommentsList);

function reverseCommentsArray(array: CommentType[]) {
  return array.reduce((acc: CommentType[], item: CommentType) => [item, ...acc], []);
}
