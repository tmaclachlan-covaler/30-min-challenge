import React from "react";

import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Stack,
  Button,
} from "@mui/material";
import Product from "@/types/Product";
import useShoppingCart from "@/hooks/useShoppingCart";

export interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addProduct, removeProduct, hasProduct } = useShoppingCart();

  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="subtitle1">{product.type}</Typography>
          <Typography variant="overline">{`$ ${product.price}`}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" flex={1}>
          {!hasProduct(product) ? (
            <Button
              fullWidth
              variant="contained"
              onClick={() => addProduct(product)}
            >
              Add
            </Button>
          ) : (
            <Button
              fullWidth
              color="error"
              onClick={() => removeProduct(product)}
            >
              Remove
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
