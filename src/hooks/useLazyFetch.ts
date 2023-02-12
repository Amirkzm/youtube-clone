import { useCallback, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const DEFAULT_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

const useLazyFetch = (comp: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const sendRequest = useCallback(
    async (url: string) => {
      console.log("start sending request to server for:", comp);
      setIsLoading(true);

      try {
        const rawResponse = await fetch(BASE_URL + url, DEFAULT_OPTIONS);
        if (!rawResponse.ok) {
          setIsError(true);
          throw new Error("Request failed!");
        }

        const jsonResponse = await rawResponse.json();
        setResult(jsonResponse);
      } catch (error) {
        setIsError(true);
        console.log("error happened");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        // setIsLoading(false);
      }
    },
    [comp]
  );

  return { isLoading, isError, result, sendRequest };
};

export default useLazyFetch;
