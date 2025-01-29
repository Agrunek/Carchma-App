import type { Advert, UserPublic } from '@/types/api';

import UserIcon from '@/components/atoms/UserIcon';
import Card from '@/components/atoms/Card';
import ImageCarousel from '@/components/molecules/ImageCarousel';

interface AdvertViewProps {
  advert: Advert;
  user: UserPublic;
}

const AdvertView = ({ advert, user }: AdvertViewProps) => {
  return (
    <Card className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <ImageCarousel className="h-96 w-full max-w-4xl" images={advert.images} />
        <div className="mt-8 flex min-w-64 flex-col gap-4 px-8">
          <p className="text-4xl font-semibold">{advert.title}</p>
          <p className="font-semibold">
            {advert.year}
            <span className="font-black"> · </span>
            {advert.damaged ? 'Uszkodzony' : 'Igła'}
          </p>
          <p className="text-2xl font-semibold">{advert.price} PLN</p>
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
