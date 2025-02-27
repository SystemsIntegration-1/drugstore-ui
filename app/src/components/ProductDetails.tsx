import React from "react";
import { FaTimes } from "react-icons/fa";

interface ProductDetailProps {
  product: { id: number; name: string; image: string; price: string } | null;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-black"
        >
          <FaTimes />
        </button>
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
        <h2 className="text-2xl font-bold mt-2">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.price}</p>
        <button 
          onClick={onAddToCart}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
