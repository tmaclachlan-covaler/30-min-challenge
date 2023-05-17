import Head from "next/head";
import Image from "next/image";

import { Box, Stack, Typography } from "@mui/material";
import ProductCard from "@/components/ProductCard";
import useProductsQuery from "@/hooks/queries/useProductsQuery";

export default function Home() {
  const { data: products = [], isLoading: productsLoading } =
    useProductsQuery();

  if (productsLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box justifyContent="center" flex={1} pt={4}>
      <Stack direction="row" spacing={3} justifyContent="center">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </Stack>
    </Box>
  );
}
