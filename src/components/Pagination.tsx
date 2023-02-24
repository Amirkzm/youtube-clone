import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { Button } from "@mui/material";

interface PaginationProps {
  page: number;
  onChangePage?: (page: number) => void;
}
const Pagination = ({ page, onChangePage }: PaginationProps) => {
  return (
    <ul
      style={{
        display: "flex",
        margin: "0 auto",
        listStyle: "none",
        padding: "10px 0",
      }}
    >
      <li>
        <Button
          onClick={() => onChangePage!(page - 1)}
          disabled={page === 1 ? true : false}
        >
          <NavigateBefore />
        </Button>
      </li>
      <li
        style={{
          padding: "10px 15px",
          backgroundColor: "red",
          margin: "0 20px",
          borderRadius: "50%",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        {page}
      </li>
      <li>
        <Button onClick={() => onChangePage!(page + 1)}>
          <NavigateNext />
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
