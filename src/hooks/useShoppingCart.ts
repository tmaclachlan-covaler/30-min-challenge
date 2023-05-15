import Product from '@/types/Product';
import ProductType from '@/types/ProductType';
import { useMemo, useState} from 'react';
import { useMap } from 'usehooks-ts';

export default function useShoppingCart() {
    const [map, actions] = useMap<Product, number>(new Map());

    const addProduct = (product: Product) => {
        const qty = map.get(product) ?? 0;

        actions.set(product, qty + 1);
    }

    const removeProduct = (product: Product) => {
        actions.remove(product);
    }

    const reset = () => actions.reset();

    const cart = useMemo(() => {
        const items: Array<Product & { qty: number }> = [];

        map.forEach((value, key) => {
            items.push({...key, qty: value})
        });

        return items;
    }, [map]);

    return {
        cart,
        addProduct,
        removeProduct,
        reset,
    }
}