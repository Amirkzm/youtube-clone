import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useCategoryContext } from "../../context/CategoryContext";
import { categories } from "../../utils/constants";

const Sidebar = () => {
  const { selectedCategory, setSelectedCategory } = useCategoryContext();

  return (
    <List
      sx={{
        mt: "70px",
        height: "90vh",
        pr: 2,
        borderRight: "2px solid gray",
      }}
    >
      {categories.map((category, index) => {
        return (
          <ListItem key={index} sx={{ width: "fit-content" }}>
            <ListItemButton
              sx={{
                "&:hover": { bgcolor: "primary.main" },
                "&:hover>*": { color: "text.primary" },
                borderRadius: 8,
                bgcolor:
                  selectedCategory === category.name
                    ? "primary.main"
                    : "common.black",
                width: "100%",
              }}
              onClick={() => setSelectedCategory(category.name)}
            >
              <ListItemIcon
                sx={{
                  color:
                    selectedCategory === category.name
                      ? "common.white"
                      : "primary.main",
                }}
              >
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
