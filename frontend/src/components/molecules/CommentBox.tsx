import type { Comment } from '@/types/api';

import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import UserIcon from '@/components/atoms/UserIcon';
import Card from '@/components/atoms/Card';
import { getUserQueryOptions } from '@/middleware/queryOptions';
import { tw } from '@/utils/string';

interface CommentBoxProps {
  className?: string;
  comment: Comment;
}

const baseClassName = tw`flex flex-col gap-2`;

const CommentBox = ({ comment, className }: CommentBoxProps) => {
  const style = clsx(baseClassName, className);

  const { data, isSuccess } = useQuery(getUserQueryOptions(comment.userId));

  return (
    <Card className={style}>
      <div className="flex items-center gap-2 text-lg font-semibold">
        <UserIcon className="size-10" />
        {isSuccess ? data.name : 'Anonymous'}
      </div>
      <p className="text-lg">{comment.content}</p>
    </Card>
  );
};

export default CommentBox;
