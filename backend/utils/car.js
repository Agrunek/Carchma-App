import car from '../db/car.json' with { type: 'json' };

const deepFreeze = (object) => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  Object.values(object).forEach(deepFreeze);

  return Object.freeze(object);
};

const CAR_INFO = deepFreeze(car);

export const selectField = (key, object = CAR_INFO) => {
  const values = [];

  if (key in object) {
    values.push(object[key]);
  }

  for (const array of Object.values(object).filter(Array.isArray)) {
    array.forEach((child) => values.push(selectField(key, child)));
  }

  return values.flat();
};

export const avoidField = (key, object = CAR_INFO) => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((v) => avoidField(key, v));
  }

  const filteredEntries = Object.entries(object).filter(([k]) => k !== key);

  const mappedEntries = filteredEntries.map(([k, v]) => [k, avoidField(key, v)]);

  return Object.fromEntries(mappedEntries);
};

export const findItemById = (items, id) => {
  return items.find((item) => item.id === id) || null;
};

export const extractPrimitives = (item) => {
  return { id: item.id, name: item.name };
};

export const extractId = (item) => {
  return item.id;
};
