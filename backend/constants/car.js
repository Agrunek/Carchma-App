import car from '../db/car.json' with { type: 'json' };

export const CAR_TYPES = car.car_types;
export const CAR_MAKES = CAR_TYPES.map((type) => type.car_makes).flat(Infinity);
export const CAR_MODELS = CAR_MAKES.map((make) => make.car_models).flat(Infinity);
export const BODY_TYPES = CAR_TYPES.map((type) => type.body_types).flat(Infinity);
export const FUEL_TYPES = car.fuel_types;
export const GEARBOX_TYPES = car.gearbox_types;
export const COLORS = car.colors;

export const CAR_TYPE_IDS = CAR_TYPES.map((type) => type.id);
export const CAR_MAKE_IDS = CAR_MAKES.map((make) => make.id);
export const CAR_MODEL_IDS = CAR_MODELS.map((model) => model.id);
export const BODY_TYPE_IDS = BODY_TYPES.map((body) => body.id);
export const FUEL_TYPE_IDS = FUEL_TYPES.map((fuel) => fuel.id);
export const GEARBOX_TYPE_IDS = GEARBOX_TYPES.map((gearbox) => gearbox.id);
export const COLOR_IDS = COLORS.map((color) => color.id);
