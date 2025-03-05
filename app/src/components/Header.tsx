"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaPlus, FaClipboardList } from "react-icons/fa";
import { LuPackagePlus } from "react-icons/lu";
import AddProductModal from "./AddProductModal";
import CreateBatchForm from "./CreateBatchForm";
import Image from "next/image";

interface HeaderProps {
  cart: { id: string; name: string; price: number }[];
  onCartClick: () => void;
}

export default function Header({ cart, onCartClick }: HeaderProps) {
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
  const [showBatchForm, setShowBatchForm] = useState<boolean>(false);

  const handleAddProductClick = () => setShowAddProductModal(true);
  const handleCloseProductModal = () => setShowAddProductModal(false);

  const handleBatchFormClick = () => setShowBatchForm(true);
  const handleCloseBatchForm = () => setShowBatchForm(false);

  const handleBatchSubmit = (data: any) => {
    console.log("Nuevo lote enviado:", data);
    setShowBatchForm(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 p-4 shadow-md z-50">
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4">
        <Link href="/" passHref>
          <button className="flex items-center">
            <Image src="/icon.png" alt="Farmacorp Logo" width={100} height={50} />
          </button>
        </Link>

        <div className="flex items-center space-x-6">
          <button className="relative text-white text-2xl" onClick={onCartClick}>
            <FiShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </button>

          <button onClick={handleAddProductClick} className="text-white text-2xl">
            <FaPlus className="cursor-pointer text-xl hover:text-gray-300" />
          </button>

          <button onClick={handleBatchFormClick} className="text-white text-2xl">
            <LuPackagePlus className="cursor-pointer text-xl hover:text-gray-300" />
          </button>
        </div>
      </div>

      {showAddProductModal && <AddProductModal onClose={handleCloseProductModal} />}

      {showBatchForm && <CreateBatchForm onClose={handleCloseBatchForm} />}
    </header>
  );
}
