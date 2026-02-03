import type { GetCommentsFromAdvertResult } from '@/types/api';

import clsx from 'clsx';
import Comment from '@/components/molecules/Comment';
import Pagination from '@/components/molecules/Pagination';
import Text from '@/components/atoms/Text';
import { tw } from '@/utils/string';

interface PaginatedCommentsProps {
  comments: GetCommentsFromAdvertResult['data'];
  className?: string;
  currentPage: number;
  onChange: (pageNumber: number) => void;
  totalPages: number;
}

const baseClassName = tw`flex w-full max-w-5xl flex-col gap-10`;

const PaginatedComments = ({ comments, className, currentPage, onChange, totalPages }: PaginatedCommentsProps) => {
  const style = clsx(baseClassName, className);

  return (
    <div className={style}>
      <Text variant="heading" className="self-start">
        Komentarze
      </Text>
      <div className="flex flex-col gap-6">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onChange} />
    </div>
  );
};

export default PaginatedComments;
