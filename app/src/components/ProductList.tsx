import React from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  search: string;
  products: { id: number; name: string; price: string }[];
  onSelectProduct: (product: { id: number; name: string; price: string }) => void;
}

const ProductList: React.FC<ProductListProps> = ({ search, products, onSelectProduct }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            onClick={() => onSelectProduct(product)}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-lg text-gray-500">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ProductList;
