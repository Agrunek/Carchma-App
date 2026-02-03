import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import PaginatedComments from '@/components/organisms/PaginatedComments';
import Header from '@/components/organisms/Header';
import { stringifySearch } from '@/utils/string';
import { getCommentsFromAdvertQueryOptions } from '@/middleware/queryOptions';

const Advert = () => {
  const params = useParams({ from: '/advert/$id' });
  const search = useSearch({ from: '/advert/$id' });
  const navigate = useNavigate({ from: '/advert/$id' });

  const { data: comments } = useSuspenseQuery(getCommentsFromAdvertQueryOptions(params.id, stringifySearch(search)));
  const { data, meta } = comments;

  return (
    <div className="my-20 flex min-h-screen flex-col items-center gap-10 py-10 md:px-4">
      <Header />

      <PaginatedComments
        comments={data}
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
        onChange={(pageNumber) => navigate({ to: '.', search: { page: pageNumber } })}
      />
    </div>
  );
};

export default Advert;
