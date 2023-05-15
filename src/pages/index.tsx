import useProductsQuery from "@/hooks/useProductsQuery";
import Head from "next/head";
import Image from "next/image";

import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
  const { data: products = [], isLoading: productsLoading } =
    useProductsQuery();

  if (productsLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box justifyContent="center" flex={1}>
      <Stack direction="row" spacing={3} justifyContent="center">
        {products.map((product) => (
          <Box
            key={product.name}
            p={3}
            sx={{
              cursor: "pointer",
              "&:hover": { background: "rgba(0,0,0,.3)" },
            }}
          >
            <Typography>
              {product.name} - ${product.price}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
