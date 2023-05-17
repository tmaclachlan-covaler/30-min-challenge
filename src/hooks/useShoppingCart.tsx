import {
  useMemo,
  useState,
  createContext,
  Provider,
  useContext,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useMap, useLocalStorage } from "usehooks-ts";

import Product from "@/types/Product";
import ProductType from "@/types/ProductType";

declare type SetValue<T> = Dispatch<SetStateAction<T>>;
type CartItem = Product & { qty: number };
type Cart = { [key: string]: CartItem };

const ShoppingContext = createContext<[Cart, SetValue<Cart>] | null>(null);

export default function useShoppingCart() {
  const [map, setMap] = useContext(ShoppingContext)!;

  const addProduct = (product: Product) => {
    const info = map[product.name] ?? {
      qty: 0,
      ...product,
    };

    setMap((prev) => {
      const copy = { ...prev };
      copy[product.name] = { ...info, qty: info.qty + 1 };
      return copy;
    });
  };

  const removeProduct = (product: Product) => {
    setMap((prev) => {
      const copy = { ...prev };
      delete copy[product.name];
      return copy;
    });
  };

  const reset = () => {
    setMap({});
  };

  const cart = Array.from(Object.entries(map));

  return {
    cart,
    addProduct,
    removeProduct,
    reset,
    hasProduct: (product: Product) => !!map[product.name],
    totalItems: cart.length,
  };
}

export function ShoppingCartProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const cart = useLocalStorage("cart", {});

  return (
    <ShoppingContext.Provider value={cart}>{children}</ShoppingContext.Provider>
  );
}
