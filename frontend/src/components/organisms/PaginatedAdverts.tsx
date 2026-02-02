import type { GetAdvertsResult } from '@/types/api';

import clsx from 'clsx';
import AdvertThumbnail from '@/components/molecules/AdvertThumbnail';
import Pagination from '@/components/molecules/Pagination';
import { tw } from '@/utils/string';

interface PaginatedAdvertsProps {
  adverts: GetAdvertsResult['data'];
  className?: string;
  currentPage: number;
  onChange: (pageNumber: number) => void;
  totalPages: number;
}

const baseClassName = tw`flex w-full max-w-5xl flex-col gap-10`;

const PaginatedAdverts = ({ adverts, className, currentPage, totalPages, onChange }: PaginatedAdvertsProps) => {
  const style = clsx(baseClassName, className);

  return (
    <div className={style}>
      <div className="flex flex-col gap-6">
        {adverts.map((advert) => (
          <AdvertThumbnail advert={advert} key={advert._id} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onChange} />
    </div>
  );
};

export default PaginatedAdverts;
