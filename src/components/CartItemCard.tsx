import { Stack, Typography, TextField, Grid } from "@mui/material";

import useShoppingCart, { CartItem } from "@/hooks/useShoppingCart";

export interface CartItemCardProps {
  item: CartItem;
  numNights?: number;
}

export default function CartItemCard({
  item,
  numNights = 1,
}: CartItemCardProps) {
  const { addProduct, decrementQty } = useShoppingCart();

  const total =
    item.price * item.qty * (item.type === "Membership" ? 1 : numNights);

  const handleQtyChange = (newQty: number) => {
    if (newQty > item.qty) {
      addProduct(item);
    } else {
      decrementQty(item);
    }
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={7}>
        <Typography>{item.name}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="overline">Qty:</Typography>

          {item.type === "Membership" ? (
            <Typography variant="overline">1</Typography>
          ) : (
            <Stack direction="row" alignItems="center">
              <TextField
                value={item.qty}
                onChange={(e) => handleQtyChange(parseInt(e.target.value))}
                type="number"
                size="small"
              />
            </Stack>
          )}
        </Stack>
      </Grid>
      <Grid item xs={2} justifyContent="end">
        <Typography textAlign="right">{`$${total}`}</Typography>
      </Grid>
    </Grid>
  );
}
