import React, { useCallback, useEffect, useState } from "react";
import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import Collection from "./Collection";
import Document from "./Document";
import PlusIcon from "../assets/PlusIcon.svg";
export default function SideNavBar({
  docs,
  setDocs,
  selected,
  setSelected,
  collection,
  setCollection,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNewDoc = useCallback(() => {
    const newDoc = { title: "New Doc", content: "write your contents here" };
    setDocs((prevDocs) => {
      const updatedDocs = [...prevDocs, newDoc];
      setSelected(newDoc); // Switch to the newly added document
      return updatedDocs;
    });
  }, [setDocs, setSelected]);

  useEffect(() => {}, [handleNewDoc]);

  return (
    <div style={{ marginTop: "32px" }}>
      {/* <button onClick={handleNewDoc}>Add Doc</button> */}
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h5" color={"black"}>
          Documents
        </Typography>
        <Button onClick={handleNewDoc}>
          <img src={PlusIcon} height={"25px"} width={"25px"} alt="options" />
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
      <Stack
        sx={{
          maxHeight: "300px",
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {docs.map((doc, i) => {
          return <Document setSelected={setSelected} doc={doc} />;
        })}
      </Stack>
      <Stack
        sx={{
          maxHeight: "500px",
          height: "400px",
          width: "100%",
          // overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h5" color={"black"}>
            Collections
          </Typography>
          <Button
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <img src={PlusIcon} height={"25px"} width={"25px"} alt="options" />
          </Button>
        </Stack>
        {collection.map((col, i) => {
          return <Collection collection={col} setSelected={setSelected} />;
        })}
      </Stack>
    </div>
  );
}
