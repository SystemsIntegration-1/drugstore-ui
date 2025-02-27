import React from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  search: string;
  products: { id: number; name: string; image: string; price: string }[];
  onSelectProduct: (product: { id: number; name: string; image: string; price: string }) => void;
}

const ProductList: React.FC<ProductListProps> = ({ search, products, onSelectProduct }) => {
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 pt-20">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} onClick={() => onSelectProduct(product)} />
      ))}
    </div>
  );
};

export default ProductList;
