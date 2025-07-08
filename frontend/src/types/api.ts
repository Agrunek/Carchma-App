/* Utilities */

interface SearchResult<T> {
  meta: { currentCount: number; currentPage: number; pageSize: number; totalPages: number };
  data: T[];
}

interface DefaultResult {
  message: string;
}

interface CarItem {
  id: string;
  name: string;
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

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  _id: string;
  advertId: string;
  userId: string;
  status: 'positive' | 'informative' | 'negative';
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}

interface Reaction {
  _id: string;
  userId: string;
  targetId: string;
  action: 'comment_reaction';
  value: 'like' | 'dislike';
  createdAt: string;
  updatedAt: string;
}

interface CarInfo {
  car_types: ({ body_types: CarItem[]; car_makes: CarItem[] } & CarItem)[];
  colors: CarItem[];
  fuel_types: CarItem[];
  gearbox_types: CarItem[];
}

interface MakeInfo extends CarItem {
  car_models: CarItem[];
}

interface Report {
  _id: string;
  userId: string;
  targetId: string;
  action: 'advert_report' | 'comment_report';
  value: string;
  createdAt: string;
  updatedAt: string;
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

export type GetAdvertsFromUserParams = { page?: string };

export type GetAdvertsFromUserResult = SearchResult<
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

export type RegisterData = Pick<User, 'name' | 'email' | 'password'> & { confirm: string };

export type RegisterResult = Omit<User, 'password'>;

export type LoginData = Pick<User, 'email' | 'password'>;

export type LoginResult = DefaultResult;

export type LogoutResult = DefaultResult;

export type EmailVerificationResult = DefaultResult;

export type ForgotPasswordData = Pick<User, 'email'>;

export type ForgotPasswordResult = DefaultResult;

export type ResetPasswordData = Pick<User, 'password'> & { confirm: string };

export type ResetPasswordResult = DefaultResult;

export type PostCommentData = Pick<Comment, 'status' | 'content'>;

export type PostCommentResult = Comment;

export type PutReactionData = Pick<Reaction, 'value'>;

export type PutReactionResult = Reaction | DefaultResult;

export type PatchCommentData = Pick<Comment, 'status' | 'content'>;

export type PatchCommentResult = DefaultResult;

export type GetCommentResult = Comment;

export type GetCommentsFromAdvertParams = { page?: string };

export type GetCommentsFromAdvertResult = SearchResult<Comment>;

export type GetReactionResult = Reaction | null;

export type DeleteCommentResult = DefaultResult;

export type DeleteReactionResult = DefaultResult;

export type PostImagesData = { images: File[] };

export type PostImagesResult = DefaultResult;

export type DeleteImageResult = DefaultResult;

export type GetCarInfoResult = CarInfo;

export type GetCarMakeInfoResult = MakeInfo;

export type PostAdvertReportData = Pick<Report, 'value'>;

export type PostAdvertReportResult = Report;

export type PostCommentReportData = Pick<Report, 'value'>;

export type PostCommentReportResult = Report;

export type GetReportsParams = { page?: string };

export type GetReportsResult = SearchResult<Omit<Report, 'createdAt' | 'updatedAt'>>;

export type GetCurrentProfileResult = Omit<User, 'password'>;

export type GetAnyProfileResult = Omit<User, 'email' | 'password'>;
