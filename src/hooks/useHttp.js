import { useCallback, useEffect, useState } from "react";

async function SendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }
  return resData;
}
export default function useHttp(url, config, initialData) {
  const [isLoading, SetisLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, SetError] = useState("");

  function ClearData() {
    setData({});
  }
  const sendRequest = useCallback(
    async function SendRequest(data) {
      SetisLoading(true);
      try {
        const resdata = await SendHttpRequest(url, { ...config, body: data });
        setData(resdata);
      } catch (err) {
        console.log(err.message);
        SetError(err.message || "Something went wrong");
      }
      SetisLoading(false);
    },
    [url, config],
  );
  useEffect(() => {
    if (!config || (config && (config.method === "get" || !config.method))) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    ClearData,
  };
}
