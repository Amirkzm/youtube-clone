import { useCallback, useState } from "react";

// const BASE_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL;
const BASE_URL = "https://youtube.googleapis.com/youtube/v3/";
// const key = import.meta.env.VITE_YOUTUBE_API_KEY;
const key = "AIzaSyDCwM3Ae5wQC231Aai9NyTG4Ds2SF6wphs";
const credential = `&key=${key}`;

const DEFAULT_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const useLazyFetch = (comp?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const sendRequest = useCallback(
    async (url: string) => {
      setIsLoading(true);
      console.log(BASE_URL + url + credential);

      try {
        const rawResponse = await fetch(
          BASE_URL + url + credential,
          DEFAULT_OPTIONS
        );
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
