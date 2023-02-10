import { useState, useCallback } from "react";

type RequestMethod = "POST" | "GET" | "PUT" | "DELETE" | "HEAD";

type LazyFetchResult = [
  (payload: Omit<RequestInit, "method">) => Promise<any>,
  {
    isLoading: boolean;
    result: any;
    error: boolean;
  }
];

const useLazyFetch = (
  url: string,
  method: RequestMethod = "GET"
): LazyFetchResult => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = useCallback(
    async (payload: Omit<RequestInit, "method">) => {
      setIsLoading(true);
      const options: RequestInit = {
        method: method,
        ...payload,
      };
      try {
        const response: Response = await fetch(url, options);
        if (!response.ok) {
          setError(true);
          throw new Error("Request Failed");
        }
        const jsonResponse = await response.json();
        setResult(jsonResponse);
        return jsonResponse;
      } catch (error: any) {
        console.log(error?.message);
        setIsLoading(false);
      }
    },
    [url, method]
  );

  return [sendRequest, { isLoading, result, error }];
};

export default useLazyFetch;
