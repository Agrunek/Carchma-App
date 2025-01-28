import type { Advert, CarInfo, CarMake } from '@/types/api';

export const translateAdvert = (advert: Advert, info: CarInfo, make?: CarMake): Advert => {
  const copy = { ...advert, images: [...advert.images] };

  const carType = info.car_types.find((type) => type.id === advert.type) || null;

  copy.type = carType?.name || 'Błąd';
  copy.make = make?.name || 'Błąd';
  copy.model = make?.car_models.find((model) => model.id === advert.model)?.name || 'Błąd';
  copy.fuel = info.fuel_types.find((fuel) => fuel.id === advert.fuel)?.name || 'Błąd';
  copy.gearbox = info.gearbox_types.find((gearbox) => gearbox.id === advert.gearbox)?.name || 'Błąd';
  copy.body = carType?.body_types.find((body) => body.id === advert.body)?.name || 'Błąd';
  copy.color = info.colors.find((color) => color.id === advert.color)?.name || 'Błąd';

  return copy;
};
