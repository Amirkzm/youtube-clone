import { useState, useCallback } from "react";

type RequestMethod = "POST" | "GET" | "PUT" | "DELETE" | "HEAD";

const BASE_URL = "https://youtube-v31.p.rapidapi.com/";

const DEFAULT_OPTIONS = {
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

type LazyFetchResult = [
  (payload: Omit<RequestInit, "method">) => Promise<any>,
  {
    isLoading: boolean;
    result: any;
    isError: boolean;
  }
];

type RapidApiHeader = {
  "X-RapidAPI-Key": string | undefined;
  "X-RapidAPI-Host": string | undefined;
};

interface RequestOptions extends Omit<RequestInit, "headers"> {
  headers?: RapidApiHeader | HeadersInit;
}

const useLazyFetch = (query: string): LazyFetchResult => {
  const [result, setResult] = useState<any>(null);
  const [isError, setisError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = useCallback(
    async (option: RequestOptions = DEFAULT_OPTIONS) => {
      setIsLoading(true);
      try {
        const response: Response = await fetch(
          BASE_URL + query,
          option as RequestInit
        );
        if (!response.ok) {
          setisError(true);
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
    [query]
  );

  return [sendRequest, { isLoading, result, isError }];
};

export default useLazyFetch;
