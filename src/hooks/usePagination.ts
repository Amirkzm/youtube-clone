import { useEffect, useState } from "react";

export interface usePaginationResult {
  currentPage: number;
  pageToken: string;
  pageHandler: (page: number) => void;
}

const usePagination = (result: any): usePaginationResult => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageToken, setPageToken] = useState<string>("");

  const pageHandler = (page: number): void => {
    if (page > currentPage) {
      setPageToken(result?.nextPageToken);
    } else if (page < currentPage) {
      setPageToken(result?.prevPageToken);
    }
    setCurrentPage(page);
  };

  return { currentPage, pageToken, pageHandler };
};

export default usePagination;
