import React from "react";

interface ProductProps {
  id: number;
  name: string;
  price: string;
  onClick: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ name, price, onClick }) => {
  return (
    <div className="bg-white p-4 shadow rounded cursor-pointer overflow-hidden" onClick={onClick}>
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{price}</p>
    </div>
  );
};

export default ProductCard;
