export const jsonToQueryString = (json = {}) => {
  return Object.keys(json).reduce(
    (acc, key) => acc + `${key}=${json[key]}&`,
    ""
  );
};
