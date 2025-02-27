import React from "react";
import { FaTimes, FaRegTrashAlt } from "react-icons/fa";

interface CartModalProps {
  cart: { id: number; name: string; image: string; price: string; quantity: number }[];
  onClose: () => void;
  onUpdateCart: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ cart, onClose, onUpdateCart, onRemoveFromCart }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-xl text-gray-700 hover:text-black"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-center">Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600 mt-2 text-center">El carrito está vacío.</p>
        ) : (
          <ul className="mt-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center space-x-4 border-b py-2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.price}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => onUpdateCart(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => onUpdateCart(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-500"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartModal;
