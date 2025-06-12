export const translateObject = (object, dictionary) => {
  return Object.fromEntries(Object.entries(object).map(([k, v]) => [dictionary[k] ?? k, v]));
};
