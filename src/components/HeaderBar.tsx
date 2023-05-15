import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function HeaderBar() {
  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        <Typography variant="h6">Products</Typography>
        <Box flexGrow={1} />
        <IconButton>
          <Badge badgeContent={1} color="primary" sx={{ color: "white" }}>
            <ShoppingCartIcon color="inherit" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
