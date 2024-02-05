import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "./ListItem";

export default function SelectedListItem({ songs }) {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", overflowY: "scroll", height: "80vh" }}>
      <List component="nav" aria-label="main mailbox folders">
        {songs?.map((song, index) => (
          <ListItem song={song} key={song._id} index={index}/>
        ))}
      </List>
    </Box>
  );
}
