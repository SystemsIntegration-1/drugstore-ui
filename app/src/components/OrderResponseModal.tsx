import React from 'react';

interface OrderResponseModalProps {
  isOpen: boolean;
  orderData: any;
  onClose: () => void;
}

const OrderResponseModal: React.FC<OrderResponseModalProps> = ({ isOpen, orderData, onClose }) => {
  if (!isOpen || !orderData) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-700 hover:text-black">×</button>
        <h2 className="text-2xl font-bold mt-2">Respuesta de Orden</h2>
        <p className="text-sm mt-4">ID de la Orden: {orderData.orderId}</p>
        <p className="text-sm mt-2">Estado: {orderData.status}</p>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Sucursal</h3>
          <p>{orderData.branch.branchName}</p>
          <p>{orderData.branch.address.cityName}, {orderData.branch.address.countryName}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Productos</h3>
          {orderData.items.map((item: any, index: number) => (
            <div key={index} className="mt-2">
              <p>{item.productName} - Cantidad: {item.quantity}</p>
              <p>{item.notes}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button onClick={onClose} className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderResponseModal;
