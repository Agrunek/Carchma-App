import type { GetAdvertsResult } from '@/types/api';

import Image from '@/components/atoms/Image';
import Text from '@/components/atoms/Text';

interface AdvertThumbnailProps {
  advert: GetAdvertsResult['data'][number];
}

const AdvertThumbnail = ({ advert }: AdvertThumbnailProps) => {
  return (
    <div className="flex flex-1 flex-col items-center overflow-hidden border-2 border-white/70 bg-white/50 md:flex-row md:rounded-md dark:border-black/70 dark:bg-black/50">
      <div className="h-50">
        <Image imageSource={`http://localhost:5050/image/${advert.images[0]}`} className="h-full" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-wrap justify-between gap-6">
          <Text variant="heading">{advert.title}</Text>
          <Text variant="subheading">{advert.price} PLN</Text>
        </div>
        <div className="flex flex-1 flex-wrap gap-6">
          {advert.verified && (
            <div className="rounded-md border-2 border-emerald-600/70 bg-emerald-600/50 px-2 py-1 dark:border-emerald-500/70 dark:bg-emerald-500/50">
              <Text>Zweryfikowany</Text>
            </div>
          )}
          {advert.damaged && (
            <div className="rounded-md border-2 border-rose-600/70 bg-rose-600/50 px-2 py-1 dark:border-rose-500/70 dark:bg-rose-500/50">
              <Text>Uszkodzony</Text>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-wrap gap-6">
          <Text>{advert.displacement} cm3</Text>
          <Text>{advert.power} KM</Text>
          <Text>{advert.mileage} km</Text>
        </div>
        <div className="flex flex-1 flex-wrap gap-6">
          <Text>Paliwo: {advert.fuel}</Text>
          <Text>Skrzynia: {advert.gearbox}</Text>
          <Text>Rocznik: {advert.year}</Text>
        </div>
      </div>
    </div>
  );
};

export default AdvertThumbnail;
