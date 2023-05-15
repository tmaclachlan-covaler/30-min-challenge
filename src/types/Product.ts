import ProductType from "./ProductType"

type Product = {
    name: string,
    type: ProductType,
    price: number;
}

export default Product;