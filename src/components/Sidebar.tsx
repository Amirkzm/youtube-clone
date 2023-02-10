import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { categories } from "../utils/constants";

const Sidebar = () => {
  return (
    <List
      sx={{
        pt: "70px",
        height: "90vh",
        px: 2,
        borderRight: "2px solid background.paper",
      }}
    >
      {categories.map((category, index) => {
        return (
          <ListItem disablePadding key={index}>
            <ListItemButton
              sx={{
                "&:hover": { bgcolor: "primary.main" },
                "&:hover>*": { color: "text.primary" },
                borderRadius: 8,
              }}
            >
              <ListItemIcon sx={{ color: "primary.main" }}>
                {category.icon}
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Sidebar;
