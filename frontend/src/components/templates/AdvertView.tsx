import type { Advert, UserPublic } from '@/types/api';

import { useQuery } from '@tanstack/react-query';
import UserIcon from '@/components/atoms/UserIcon';
import Card from '@/components/atoms/Card';
import CommentBox from '@/components/molecules/CommentBox';
import ImageCarousel from '@/components/molecules/ImageCarousel';
import { getAdvertCommentsQueryOptions } from '@/middleware/queryOptions';
import Section from '@/components/molecules/Section';

interface AdvertViewProps {
  advert: Advert;
  user: UserPublic;
}

const AdvertView = ({ advert, user }: AdvertViewProps) => {
  const { data = [] } = useQuery(getAdvertCommentsQueryOptions(advert._id));

  return (
    <Card className="flex w-full flex-col">
      <div className="flex flex-col lg:flex-row">
        <ImageCarousel images={advert.images} className="h-96 w-full max-w-full lg:max-w-screen-md" />
        <div className="mx-4 mt-4 flex flex-col gap-2 lg:mx-0 lg:ml-8">
          <p className="text-4xl font-bold">{advert.title}</p>
          <p className="mx-4 mt-4 text-lg font-semibold">
            {advert.year}
            <span className="font-black"> · </span>
            {advert.damaged ? 'Uszkodzony' : 'Igła'}
          </p>
          <p className="mx-4 text-2xl font-semibold">{advert.price} PLN</p>
        </div>
      </div>
      <Section title="OPIS" className="mx-4 mt-10">
        <p className="mx-4 text-lg">{advert.description}</p>
      </Section>
      <Section title="SPECYFIKACJA" className="mx-4 mt-10">
        <p className="mx-4 text-lg">To be implemented...</p>
      </Section>
      <Section title="KONTAKT" className="mx-4 mt-10">
        <div className="mx-4 flex items-center gap-2 text-lg font-semibold">
          <UserIcon className="size-10" />
          {user.name}
        </div>
      </Section>
      <Section title="OPINIE" className="mx-4 mt-10">
        {data.length > 0 ? (
          data.map((comment) => <CommentBox key={comment._id} comment={comment} className="mx-4" />)
        ) : (
          <p className="mx-4 text-lg">Brak komentarzy dla tego ogłoszenia...</p>
        )}
      </Section>
    </Card>
  );
};

export default AdvertView;
