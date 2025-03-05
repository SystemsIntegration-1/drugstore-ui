import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import EditProductModal from "./EditProductModal";
import SearchBranchModal from "./SearchBranchModal";
import DisplayBranchInfoModal from "./DisplayBranchInfoModal";
import OrderInventoryModal from "./OrderInventoryModal";  
import OrderResponseModal from "./OrderResponseModal";  

interface ProductDetailProps {
  product: { 
    id: string; 
    name: string; 
    description: string; 
    category: string; 
    warehouseLocation: string; 
    sharedId: string;
    price: number;  
  } | null;
  onClose: () => void;
  onAddToCart: () => void;
  onOrderInventory?: () => void;
  onSearchBranch?: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToCart,
  onOrderInventory,
  onSearchBranch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(true);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isBranchInfoModalOpen, setIsBranchInfoModalOpen] = useState(false);
  const [isOrderInventoryModalOpen, setIsOrderInventoryModalOpen] = useState(false);
  const [isOrderResponseModalOpen, setIsOrderResponseModalOpen] = useState(false); 
  const [branchData, setBranchData] = useState({
    branchId: "",
    medId: "",
    amount: 0,
  });
  const [orderData, setOrderData] = useState<{ productId: string; quantity: number } | null>(null);

  const openModal = () => {
    setIsProductDetailOpen(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsProductDetailOpen(true);
  };

  const openBranchModal = () => {
    setIsBranchModalOpen(true);
  };

  const closeBranchModal = () => {
    setIsBranchModalOpen(false);
  };

  const openBranchInfoModal = () => {
    setIsBranchInfoModalOpen(true);
  };

  const closeBranchInfoModal = () => {
    setIsBranchInfoModalOpen(false);
  };

  const openOrderInventoryModal = () => {
    setIsOrderInventoryModalOpen(true);
  };

  const closeOrderInventoryModal = () => {
    setIsOrderInventoryModalOpen(false);
  };

  const openOrderResponseModal = () => {
    setIsOrderResponseModalOpen(true);
  };

  const closeOrderResponseModal = () => {
    setIsOrderResponseModalOpen(false);
  };

  const handleBranchSubmit = (branchId: string, medId: string, amount: number) => {
    setBranchData({ branchId, medId, amount });
    openBranchInfoModal();
  };

  const handleOrder = (orderData: { productId: string, quantity: number }) => {
    setOrderData(orderData);
    openOrderResponseModal();
  };

  if (!product) return null;

  return (
    <>
      {isProductDetailOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-xl text-gray-700 hover:text-black"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mt-2">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-gray-600 mt-2">Categoría: {product.category}</p>
            <p className="text-gray-600 mt-2">Ubicación: {product.warehouseLocation}</p>
            <p className="text-gray-600 mt-2">ID Compartido: {product.sharedId}</p>
            <p className="text-gray-800 font-semibold mt-2">Precio: BOB{product.price.toFixed(2)}</p>

            <div className="mt-4 space-y-2">
              <button
                onClick={onAddToCart}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Agregar al carrito
              </button>

              <button
                onClick={openOrderInventoryModal}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Ordenar al inventario
              </button>

              <button
                onClick={openBranchModal}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Buscar en otra sucursal
              </button>

              <button
                onClick={openModal}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Editar Producto
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && <EditProductModal productId={product.id} onClose={closeModal} />}
      {isBranchModalOpen && (
        <SearchBranchModal onClose={closeBranchModal} onSubmit={handleBranchSubmit} />
      )}
      {isBranchInfoModalOpen && (
        <DisplayBranchInfoModal
          branchId={branchData.branchId}
          medId={branchData.medId}
          amount={branchData.amount}
          onClose={closeBranchInfoModal}
        />
      )}
      
      {isOrderInventoryModalOpen && (
        <OrderInventoryModal 
          isOpen={isOrderInventoryModalOpen} 
          onClose={closeOrderInventoryModal} 
          onOrder={handleOrder} 
        />
      )}
      {isOrderResponseModalOpen && (
        <OrderResponseModal 
          isOpen={isOrderResponseModalOpen} 
          orderData={orderData} 
          onClose={closeOrderResponseModal} 
        />
      )}
    </>
  );
};

export default ProductDetail;
