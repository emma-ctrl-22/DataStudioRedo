import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import React from "react";

const useDataFetch = (url, options = { method: 'GET', body: null, successMessage: 'Data fetched successfully', errorMessage: 'Error fetching data' }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    const { method, body, successMessage, errorMessage } = options;
    const source = axios.CancelToken.source();

    setLoading(true);
    setError(null);

    axios({
      url,
      method,
      data: body,
      cancelToken: source.token,
    })
      .then((res) => {
        setData(res.data.data);
        toast.success(successMessage);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          setError(err);
          toast.custom(
            <div>
              {errorMessage}
              <button onClick={retry} className="ml-2 underline text-blue-600">
                Retry
              </button>
            </div>
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [url, options]);

  const retry = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry };
};

export default useDataFetch;
