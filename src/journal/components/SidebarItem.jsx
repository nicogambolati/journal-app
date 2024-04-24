import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { setActiveNote } from "../../store/journal/journalSlice";

export const SidebarItem = ({ title = "", body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();
  const onActive = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  // Con useMemo, se evita que title.length se realice en cada renderizado del componente, mejora el rendimiento de la app
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onActive}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container display={"flex"} flexDirection={"column"}>
          <ListItemText primary={newTitle} />
          {!!body ? (
            <ListItemText
              secondary={body}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            />
          ) : (
            ""
          )}
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
