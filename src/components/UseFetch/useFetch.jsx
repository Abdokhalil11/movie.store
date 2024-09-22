import { useState, useEffect, useContext } from "react";
import { apiContext } from "../../Api_Context";
const useFetch = (path, QureyParam, ...dep) => {
  const { url, key } = useContext(apiContext);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetch(url + path + "?" + key + "&" + QureyParam)
      .then((res) => {
        setIsLoading(false);
        setError(false);
        return res.json();
      })
      .then((data) => setData(data))
      .catch(() => setError(true));
    () => false;
  }, [...dep]);

  return { data, isLoading, error };
};
export default useFetch;
