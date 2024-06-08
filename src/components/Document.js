import { Typography } from "@mui/material";
import React from "react";

export default function Document({ setSelected, doc }) {
  return (
    <>
      {doc && (
        <Typography
          variant="p"
          color={"black"}
          onClick={() => {
            setSelected(doc);
          }}
          sx={{ cursor: "pointer", mt: 2, mb: 2 }}
        >
          {doc.title}
        </Typography>
      )}
    </>
  );
}
