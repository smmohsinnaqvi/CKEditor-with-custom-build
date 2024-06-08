import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import OptionImg from "../assets/options-svgrepo-com.svg";
import Document from "./Document";

export default function Collection({ collection, setSelected }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDocs, setShowDocs] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewCollection = () => {};
  const showColDocs = () => {
    setShowDocs(!showDocs);
  };

  return (
    <>
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Typography
          variant="p"
          color={"black"}
          onClick={showColDocs}
          sx={{ cursor: "pointer" }}
        >
          {collection.title}
        </Typography>
        <Button aria-expanded={open ? "true" : undefined} onClick={handleClick}>
          <img src={OptionImg} height={"10px"} width={"15px"} alt="options" />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Add New Doc</MenuItem>
          <MenuItem onClick={handleClose}>Rename Collection</MenuItem>
          <MenuItem onClick={handleClose}>Delete Collection</MenuItem>
        </Menu>
      </Stack>
      {showDocs &&
        collection.docs.map((doc, i) => {
          return (
            <Stack
              key={i}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Document setSelected={setSelected} doc={doc} />
            </Stack>
          );
        })}
    </>
  );
}
