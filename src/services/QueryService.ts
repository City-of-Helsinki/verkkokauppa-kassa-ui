export const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

export const getQueryStringVal = (key: string): string | null => {
  return getQuery().get(key);
};