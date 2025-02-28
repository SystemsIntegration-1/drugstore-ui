import React from "react";
import { FaTimes } from "react-icons/fa";

interface ProductDetailProps {
  product: { id: number; name: string; price: string; stock: number } | null;
  onClose: () => void;
  onAddToCart: () => void;
  onOrderInventory?: () => void; // Opcional
  onSearchBranch?: () => void; // Opcional
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToCart,
  onOrderInventory,
  onSearchBranch,
}) => {
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
        <h2 className="text-2xl font-bold mt-2">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.price}</p>
        <p className="text-gray-600 mt-2">Stock disponible: {product.stock}</p>

        <div className="mt-4 space-y-2">
          <button 
            onClick={onAddToCart}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
          </button>

          <button 
            onClick={onOrderInventory}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Ordenar al inventario
          </button>

          <button 
            onClick={onSearchBranch}
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Buscar en otra sucursal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
