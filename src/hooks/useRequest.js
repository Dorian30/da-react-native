import { useState, useEffect } from 'react';

function useRequest(query, params) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      if (!data) {
        try {
          const response = await query(params);
          if (response.ok) {
            setData(response.data);
            setLoading(false);
          } else {
            throw Error("We couldn't get your books, try later");
          }
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      }
    })();
  }, [query, params, data]);

  return [data, loading, error];
}

export default useRequest;
