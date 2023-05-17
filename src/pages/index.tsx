import Head from "next/head";
import Image from "next/image";

import { Box, Stack, Typography } from "@mui/material";
import ProductCard from "@/components/ProductCard";
import useProductsQuery from "@/hooks/queries/useProductsQuery";
import useMembership from "@/hooks/useMembership";

export default function Home() {
  const { data: products = [], isLoading: productsLoading } =
    useProductsQuery();

  const [hasMembership] = useMembership();

  if (productsLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box justifyContent="center" flex={1} pt={4}>
      <Stack direction="row" spacing={3} justifyContent="center">
        {products
          .filter((p) => {
            if (p.type === "Membership" && hasMembership) return false;

            return true;
          })
          .map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
      </Stack>
    </Box>
  );
}
