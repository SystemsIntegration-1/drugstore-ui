import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  warehouseLocation: string;
  sharedId: string;
}

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelectProduct }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => onSelectProduct(product)} 
            />
          ))
        }
      </div>
    </div>
  );
};

export default ProductList;
