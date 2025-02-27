import React from "react";

interface ProductProps {
  id: number;
  name: string;
  image: string;
  price: string;
  onClick: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ name, image, price, onClick }) => {
  return (
    <div className="bg-white p-4 shadow rounded cursor-pointer overflow-hidden" onClick={onClick}>
      <img src={image} alt={name} className="w-full max-h-40 object-contain rounded" />
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{price}</p>
    </div>
  );
};

export default ProductCard;
