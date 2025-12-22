import clsx from 'clsx';
import Button from '@/components/atoms/Button';
import { tw } from '@/utils/string';

const CLOSE_NUMBER_RANGE = 3;

interface PaginationProps {
  className?: string;
  currentPage: number;
  onChange: (pageNumber: number) => void;
  totalPages: number;
}

const baseClassName = tw`inline-flex items-center justify-center gap-4`;

const Pagination = ({ className, currentPage, totalPages, onChange }: PaginationProps) => {
  const style = clsx(baseClassName, className);

  const pagePivot = Math.min(Math.max(currentPage, CLOSE_NUMBER_RANGE), totalPages - CLOSE_NUMBER_RANGE + 1);
  const pageRange = Array.from(Array(totalPages).keys(), (n) => n + 1);
  const pages = pageRange.filter((n) => n <= 1 || Math.abs(n - pagePivot) <= CLOSE_NUMBER_RANGE || n >= totalPages);

  return (
    <div className={style}>
      {pages.map((n, idx, arr) => {
        const isEllipsis = arr[idx - 1] && arr[idx + 1] && (n - arr[idx - 1] > 1 || arr[idx + 1] - n > 1);

        return (
          <Button
            className={n === currentPage ? 'font-black!' : ''}
            key={n}
            onClick={() => onChange(n)}
            variant={isEllipsis ? 'tertiary' : 'secondary'}
          >
            {isEllipsis ? '...' : n}
          </Button>
        );
      })}
    </div>
  );
};

export default Pagination;
