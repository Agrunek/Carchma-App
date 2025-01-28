import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import ArrowPathIcon from '@/components/atoms/ArrowPathIcon';
import { tw } from '@/utils/string';

interface ImageProps {
  className?: string;
  image: string;
}

const baseClassName = tw`relative bg-gray-200`;

const Image = ({ className, image }: ImageProps, ref: React.ForwardedRef<HTMLImageElement>) => {
  const style = clsx(baseClassName, className);

  const [loading, setLoading] = useState(true);

  return (
    <div className={style}>
      {loading && (
        <>
          <div className="absolute size-full animate-pulse bg-gray-300" />
          <ArrowPathIcon className="absolute inset-0 m-auto size-10 animate-spin text-emerald-700" />
        </>
      )}
      <img
        ref={ref}
        alt={`Image: ${image}`}
        src={`http://localhost:5050/image/${image}`}
        onLoad={() => setLoading(false)}
        className="size-full object-contain"
      />
    </div>
  );
};

export default forwardRef(Image);
