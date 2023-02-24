import { useEffect, useState } from "react";

export interface usePaginationResult {
  paginationCount: number;
  currentPage: number;
  pageToken: string;
  pageHandler: (page: number) => void;
}

const usePagination = (result: any): usePaginationResult => {
  const [paginationCount, setPagitnationCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageToken, setPageToken] = useState<string>("");

  useEffect(() => {
    if (result) {
      setPagitnationCount(
        Math.floor(
          result?.pageInfo?.totalResults / result?.pageInfo?.resultsPerPage
        )
      );
    }
  }, [result]);

  const pageHandler = (page: number): void => {
    if (page > currentPage) {
      setPageToken(result?.nextPageToken);
    } else if (page < currentPage) {
      setPageToken(result?.prevPageToken);
    }
    setCurrentPage(page);
  };

  return { paginationCount, currentPage, pageToken, pageHandler };
};

export default usePagination;
