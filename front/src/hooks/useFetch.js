import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(url);
      setData(await response.json());
      setLoading(false);
    })();
  }, []);

  return [loading, data];
};
