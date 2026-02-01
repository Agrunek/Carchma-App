export const tw = (styles: TemplateStringsArray) => styles.join('');

export const stringifySearch = (search: object) => {
  return Object.fromEntries(
    Object.entries(search)
      .filter(([, v]) => v && (!Array.isArray(v) || v.length > 0))
      .map(([k, v]) => [k, Array.isArray(v) ? v.join() : v.toString()]),
  );
};
