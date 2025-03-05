import React, { useState } from 'react';

interface OrderInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrder: (orderData: any) => void;
}

const OrderInventoryModal: React.FC<OrderInventoryModalProps> = ({ isOpen, onClose, onOrder }) => {
  const [branchId, setBranchId] = useState('');
  const [items, setItems] = useState([{ productId: '', productName: '', productDescription: '', quantity: 0, notes: '' }]);

  const handleAddItem = () => {
    setItems([...items, { productId: '', productName: '', productDescription: '', quantity: 0, notes: '' }]);
  };

  const handleSubmit = async () => {
    const orderData = {
      branchId,
      items,
    };

    try {
      const response = await fetch('http://localhost:8080/refills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      onOrder(result);
      onClose(); 
    } catch (error) {
      console.error('Error al realizar la orden:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-700 hover:text-black">×</button>
        <h2 className="text-2xl font-bold mt-2">Ordenar Inventario</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">ID de Sucursal:</label>
          <input
            type="text"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Productos</h3>
          {items.map((item, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                placeholder="ID Producto"
                value={item.productId}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].productId = e.target.value;
                  setItems(newItems);
                }}
                className="w-full mt-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Nombre Producto"
                value={item.productName}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].productName = e.target.value;
                  setItems(newItems);
                }}
                className="w-full mt-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Descripción Producto"
                value={item.productDescription}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].productDescription = e.target.value;
                  setItems(newItems);
                }}
                className="w-full mt-2 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={item.quantity}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].quantity = +e.target.value;
                  setItems(newItems);
                }}
                className="w-full mt-2 p-2 border rounded"
                min={0}
              />
              <input
                type="text"
                placeholder="Notas"
                value={item.notes}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].notes = e.target.value;
                  setItems(newItems);
                }}
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
          ))}
          <button
            onClick={handleAddItem}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar Producto
          </button>
        </div>
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Confirmar Orden
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderInventoryModal;
