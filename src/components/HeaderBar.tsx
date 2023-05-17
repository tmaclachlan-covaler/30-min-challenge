import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
  Menu,
  Tooltip,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

import ShoppingCart from "./ShoppingCart";

import useShoppingCart from "@/hooks/useShoppingCart";
import useMenu from "@/hooks/useMenu";
import useMembership from "@/hooks/useMembership";

export default function HeaderBar() {
  const { totalItems } = useShoppingCart();

  const [invisible, setInvisible] = useState(true);
  const [hasMembership, setHasMembership] = useMembership();

  useEffect(() => {
    if (totalItems > 0) setInvisible(false);
    else setInvisible(true);
  }, [totalItems]);

  const { open, handleOpen, handleClose, anchorEl } = useMenu();

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        <Typography variant="h6">Products</Typography>
        <Box flexGrow={1} />
        <IconButton onClick={handleOpen}>
          <Badge
            badgeContent={totalItems}
            invisible={invisible}
            color="primary"
            sx={{ color: "white" }}
          >
            <ShoppingCartIcon color="inherit" />
          </Badge>
        </IconButton>
        {hasMembership && (
          <Tooltip title="Logout">
            <IconButton
              onClick={() => setHasMembership(false)}
              sx={{ color: "white" }}
            >
              <PersonIcon color="inherit" />
            </IconButton>
          </Tooltip>
        )}
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom",
          }}
        >
          <ShoppingCart />
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
