import React from "react";
import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
import { createOrder } from "../services/orderService"; 

interface CartModalProps {
  cart: {
    id: string;
    name: string;
    price: number; 
    quantity: number;
  }[];
  onClose: () => void;
  onUpdateCart: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  cart,
  onClose,
  onUpdateCart,
  onRemoveFromCart,
}) => {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0); 

  const order = {
    productQuantities: cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as Record<string, number>),
    totalPrice,
  };

  const handleOrder = async () => {
    try {
      const data = await createOrder(order);
      console.log("Order created successfully:", data);
      onClose(); 
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

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
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600">BOB{item.price}</p> 
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
        <div className="mt-4 text-center font-bold text-lg">
          Total: BOB{totalPrice.toFixed(2)}
        </div>
        <button
          onClick={handleOrder}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition mt-4"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default CartModal;
