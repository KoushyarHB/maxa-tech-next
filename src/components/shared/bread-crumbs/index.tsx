import { Breadcrumbs, Link, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React from "react";

type BreadCrumbsProps = {
  array: string[][];
};

export default function BreadCrumbs({ array }: BreadCrumbsProps) {
  const breadcrumbs = array.map((item, index) => {
    const isLast = index === array.length - 1;
    return (
      <Link
        sx={{
          fontSize: "18px",
          color: isLast ? "blue" : "inherit",
          textDecoration: isLast ? "underline" : "none",
        }}
        underline="hover"
        key={index + 1}
        href={item[1]}
      >
        {item[0]}
      </Link>
    );
  });
  return (
    <Stack sx={{ mb: "40px", pt: "24px" }} spacing={2}>
      <Breadcrumbs
        separator={
          <NavigateNextIcon fontSize="large" sx={{ color: "#717171" }} />
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
