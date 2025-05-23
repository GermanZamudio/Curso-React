import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //El manejo de errores lo estudie en un video. Y lo agregue casi tal cual al mismo.
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null); 

    fetch(url, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === 'AbortError') return; 
        setError(error.message || String(error));
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
}