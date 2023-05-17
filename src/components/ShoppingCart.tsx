import { useCallback, useMemo, useState } from "react";

import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import useShoppingCart from "@/hooks/useShoppingCart";
import applyDiscount from "@/utils/applyDiscount";

import CartItemCard from "./CartItemCard";
import useMembership from "@/hooks/useMembership";

export default function ShoppingCart() {
  const [numNights, setNumNights] = useState(1);

  const { cart, reset, totalItems } = useShoppingCart();

  const preDiscountTotal = useMemo(() => {
    return cart.reduce((_total, [_, item]) => {
      return (
        _total +
        item.qty * item.price * (item.type === "Membership" ? 1 : numNights)
      );
    }, 0);
  }, [cart, numNights]);

  const [hasMembership, setHasMembership] = useMembership();

  const total = useMemo(() => {
    return applyDiscount(preDiscountTotal, hasMembership);
  }, [hasMembership, preDiscountTotal]);

  const qualifiesForDiscount = useMemo(() => {
    return preDiscountTotal > total;
  }, [preDiscountTotal, total]);

  const onClear = useCallback(() => {
    setNumNights(1);
    reset();
  }, [reset]);

  const onCheckout = useCallback(() => {
    if (cart.some((v) => v[1].type === "Membership")) {
      setHasMembership(true);
    }

    onClear();
  }, [cart, onClear, setHasMembership]);

  return (
    <Stack p={2} minWidth={300} spacing={2}>
      <TextField
        label="Number of Nights"
        value={numNights}
        onChange={(e) => setNumNights(parseInt(e.target.value))}
        type="number"
        size="small"
      />

      {totalItems === 0 && <Typography>No items in cart</Typography>}

      {cart.map(([_, item]) => {
        return (
          <Box key={item.name}>
            <CartItemCard item={item} numNights={numNights} />
          </Box>
        );
      })}

      <Box>
        {qualifiesForDiscount && (
          <Typography textAlign="right">
            Discount: {`$${preDiscountTotal - total}`}
          </Typography>
        )}
        <Typography textAlign="right">Total: {`$${total}`}</Typography>
      </Box>
      <Stack spacing={1}>
        <Button
          disabled={totalItems === 0}
          onClick={onCheckout}
          size="small"
          fullWidth
          variant="contained"
        >
          Checkout
        </Button>
        <Button
          disabled={totalItems === 0}
          onClick={onClear}
          fullWidth
          size="small"
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}
