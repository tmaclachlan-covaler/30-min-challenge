import Product from "@/types/Product";
import { useQuery } from "react-query";

// doesn't need to be async in this example, but will be in a real system
const fetchProducts = async () => {
    return [
        {"name": "Unpowered site", "type": "Accommodation - Site", "price": 40},
        {"name": "Powered site", "type": "Accommodation - Site", "price": 60},
        {"name": "Poolside Cabin", "type": "Accommodation - Cabin", "price": 210},
        {"name": "Luxury Safari Tent", "type": "Accommodation - Cabin", "price": 340},
        {"name": "Membership", "type": "Accommodation - Site", "price": 500}
    ] as Product[]
}

export default function useProductsQuery() {
    return useQuery('products', fetchProducts);
}