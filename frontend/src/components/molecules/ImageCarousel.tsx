import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, Transition } from '@headlessui/react';
import ChevronLeftIcon from '@/components/atoms/ChevronLeftIcon';
import ChevronRightIcon from '@/components/atoms/ChevronRightIcon';
import Image from '@/components/atoms/Image';
import { tw } from '@/utils/string';

interface ImageCarouselProps {
  className?: string;
  duration?: number;
  images: string[];
}

const baseClassName = tw`absolute size-full cursor-pointer transition duration-500 ease-linear`;
const forwardClassName = tw`data-[enter]:translate-x-full data-[leave]:-translate-x-full`;
const backwardClassName = tw`data-[enter]:-translate-x-full data-[leave]:translate-x-full`;

const ImageCarousel = ({ className, duration = 5000, images }: ImageCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [ignored, setIgnored] = useState(true);
  const [forward, setForward] = useState(true);
  const [focused, setFocused] = useState(false);

  const next = useCallback(() => {
    setForward(true);
    setCurrent((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images]);

  const prev = useCallback(() => {
    setForward(false);
    setCurrent((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images]);

  useEffect(() => {
    if (ignored && !focused) {
      const timer = setInterval(next, duration);
      return () => clearTimeout(timer);
    }
  }, [current, duration, focused, ignored, next]);

  const transitionStyle = clsx(baseClassName, forward ? forwardClassName : backwardClassName);

  return (
    <>
      <div className={className} onMouseLeave={() => setIgnored(true)} onMouseEnter={() => setIgnored(false)}>
        <div className="relative size-full overflow-hidden bg-gray-200">
          {images.map((image, index) => (
            <Transition
              key={image}
              as="div"
              show={current === index}
              className={transitionStyle}
              onClick={() => setFocused(true)}
            >
              <Image image={image} className="size-full" />
            </Transition>
          ))}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/80 p-2 text-white shadow-md hover:bg-black/70 active:bg-black/90"
            onClick={prev}
          >
            <ChevronLeftIcon className="size-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/80 p-2 text-white shadow-md hover:bg-black/70 active:bg-black/90"
            onClick={next}
          >
            <ChevronRightIcon className="size-6" />
          </button>
          <div className="absolute bottom-4 flex w-full justify-center">
            <p className="rounded-md bg-black/80 p-2 text-center text-xs font-semibold text-white shadow-md">
              {current + 1} / {images.length}
            </p>
          </div>
        </div>
      </div>
      <Dialog open={focused} onClose={() => setFocused(false)} transition className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-md border-2 border-emerald-700 bg-gray-200 p-4 shadow-md shadow-emerald-700/50">
            <Image image={images[current]} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ImageCarousel;
