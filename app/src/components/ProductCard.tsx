import React from "react";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  category: string;
  warehouseLocation: string;
  sharedId: string; 
  price: number;  // Nuevo campo para el precio
  onClick: () => void;
}

const ProductCard: React.FC<ProductProps> = ({
  name,
  description,
  category,
  warehouseLocation,
  sharedId, 
  price,
  onClick,
}) => {
  return (
    <div className="bg-white p-4 shadow rounded cursor-pointer overflow-hidden" onClick={onClick}>
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-600">Categoría: {category}</p>
      <p className="text-gray-600">Ubicación: {warehouseLocation}</p>
      <p className="text-gray-600">ID Compartido: {sharedId}</p>
      <p className="text-gray-800 font-semibold">Precio: BOB{price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
