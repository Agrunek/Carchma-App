export interface UserPrivate {
  _id: string;
  name: string;
  email: string;
  verified: boolean;
}

interface CarItem {
  id: string;
  name: string;
}

export interface Advert {
  _id: string;
  userId: string;
  type: CarItem;
  vin: string;
  registrationNumber: string;
  dateOfFirstRegistration: string;
  mileage: number;
  damaged: boolean;
  make: CarItem;
  model: CarItem;
  year: number;
  fuel: CarItem;
  power: number;
  displacement: number;
  doors: number;
  gearbox: CarItem;
  body: CarItem;
  color: CarItem;
  title: string | null;
  price: number | null;
  description: string | null;
  published: boolean;
  verified: boolean;
  closed: boolean;
  images: string[];
}

interface CarTypeInfo extends CarItem {
  body_types: CarItem[];
  car_makes: CarItem[];
}

export interface CarInfo {
  car_types: CarTypeInfo[];
  colors: CarItem[];
  fuel_types: CarItem[];
  gearbox_types: CarItem[];
}

export interface CarMake extends CarItem {
  car_models: CarItem[];
}
