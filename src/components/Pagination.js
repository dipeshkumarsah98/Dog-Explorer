import React from "react";
import { Pagination as Paginat } from "@mui/material";
import { Stack } from "@mui/system";

export default function Pagination({
  itemCount: totalItem,
  pageChange,
  currentPage,
  pageSize,
}) {
  const pageCount = Math.ceil(totalItem / pageSize || 10);
  const pages = [];
  const handleChange = (event, value) => {
    pageChange(value);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  if (pageCount === 1) return null;

  //This will create array of range pageCount
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <Stack
      spacing={2}
      className="justify-content-center align-items-center my-5"
    >
      <Paginat
        color="primary"
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}
