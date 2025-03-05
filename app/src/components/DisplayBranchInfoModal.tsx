import React from "react";
import { FaTimes } from "react-icons/fa";

interface DisplayBranchInfoModalProps {
  branchId: string;
  medId: string;
  amount: number;
  onClose: () => void;
}

const DisplayBranchInfoModal: React.FC<DisplayBranchInfoModalProps> = ({
  branchId,
  medId,
  amount,
  onClose,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-black"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mt-2">Información de la Sucursal</h2>

        <div className="mt-4">
          <p><strong>Branch ID:</strong> {branchId}</p>
          <p><strong>Med ID (Shared ID):</strong> {medId}</p>
          <p><strong>Amount:</strong> {amount}</p>
        </div>

        <div className="mt-4 text-center">
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayBranchInfoModal;
