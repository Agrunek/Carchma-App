/* Utilities */

interface SearchResult<T> {
  meta: { currentCount: number; currentPage: number; pageSize: number; totalPages: number };
  data: T[];
}

interface DefaultResult {
  message: string;
}

/* Models */

interface Advert {
  _id: string;
  userId: string;
  type: string;
  vin: string;
  registrationNumber: string;
  dateOfFirstRegistration: string;
  mileage: number;
  damaged: boolean;
  make: string;
  model: string;
  year: number;
  fuel: string;
  power: number;
  displacement: number;
  doors: number;
  gearbox: string;
  body: string;
  color: string;
  title: string | null;
  price: number | null;
  description: string | null;
  published: boolean;
  verified: boolean;
  closed: boolean;
  createdAt: string;
  updatedAt: string;
  images: string[];
}

/* APIs */

export type PostAdvertData = Omit<
  Advert,
  | '_id'
  | 'userId'
  | 'title'
  | 'price'
  | 'description'
  | 'published'
  | 'verified'
  | 'closed'
  | 'createdAt'
  | 'updatedAt'
  | 'images'
>;

export type PostAdvertResult = Advert;

export type PatchAdvertData =
  | Omit<
      Advert,
      | '_id'
      | 'userId'
      | 'title'
      | 'price'
      | 'description'
      | 'published'
      | 'verified'
      | 'closed'
      | 'createdAt'
      | 'updatedAt'
      | 'images'
    >
  | Pick<Advert, 'title' | 'price' | 'description'>;

export type PatchAdvertResult = DefaultResult;

export type GetAdvertResult = Advert;

export type GetAdvertsParams = {
  page?: string;
  query?: string;
  min_mileage?: string;
  max_mileage?: string;
  damaged?: string;
  make?: string;
  model?: string;
  min_year?: string;
  max_year?: string;
  fuel?: string;
  min_power?: string;
  max_power?: string;
  gearbox?: string;
  body?: string;
  color?: string;
};

export type GetAdvertsResult = SearchResult<
  Pick<
    Advert,
    | '_id'
    | 'userId'
    | 'mileage'
    | 'damaged'
    | 'year'
    | 'fuel'
    | 'power'
    | 'displacement'
    | 'gearbox'
    | 'title'
    | 'price'
    | 'verified'
    | 'images'
  >
>;
