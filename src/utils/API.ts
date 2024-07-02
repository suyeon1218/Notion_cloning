export const makeQueryString = (
  queryKeys: Record<string, number | string | undefined>
) => {
  return Object.entries(queryKeys)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};
