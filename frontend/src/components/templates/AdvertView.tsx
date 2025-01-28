import type { Advert } from '@/types/api';

import useCarInfo from '@/hooks/useCarInfo';
import useMakeInfo from '@/hooks/useMakeInfo';
import useUser from '@/hooks/useUser';
import UserIcon from '@/components/atoms/UserIcon';
import Card from '@/components/atoms/Card';
import ImageCarousel from '@/components/molecules/ImageCarousel';
import { translateAdvert } from '@/utils/advert';

interface AdvertViewProps {
  advert: Advert;
}

const AdvertView = ({ advert }: AdvertViewProps) => {
  const { info } = useCarInfo();
  const { data } = useMakeInfo(advert.make);
  const { user } = useUser(advert.userId);

  const result = translateAdvert(advert, info, data);

  return (
    <Card className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <ImageCarousel className="h-96 w-full max-w-4xl" images={result.images} />
        <div className="mt-8 flex min-w-64 flex-col gap-4 px-8">
          <p className="text-4xl font-semibold">{result.title}</p>
          <p className="font-semibold">
            {result.year}
            <span className="font-black"> · </span>
            {result.damaged ? 'Uszkodzony' : 'Igła'}
          </p>
          <p className="text-2xl font-semibold">{result.price} PLN</p>
          <div className="hidden items-center gap-2 text-lg font-semibold md:flex">
            <UserIcon className="size-10" />
            {user.name}
          </div>
        </div>
      </div>
      <div className="mt-8 flex w-full max-w-4xl flex-col gap-4 px-8">
        <p className="text-2xl font-semibold">OPIS</p>
        <p className="w-full text-lg">{advert.description}</p>
      </div>
      <div className="mt-8 flex w-full max-w-4xl flex-col gap-4 px-8">
        <p className="text-2xl font-semibold">SPECYFIKACJA</p>
        <p className="w-full text-lg">To be continued...</p>
      </div>
    </Card>
  );
};

export default AdvertView;
