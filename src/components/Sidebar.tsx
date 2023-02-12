import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { categories } from "../utils/constants";

interface SidebarProps {
  changeCategory: (categoryName: string) => void;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <List
      sx={{
        mt: "70px",
        height: "90vh",
        px: 2,
        borderRight: "2px solid gray",
      }}
      id="sidebarRoot"
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
              onClick={() => props.changeCategory(category.name)}
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
