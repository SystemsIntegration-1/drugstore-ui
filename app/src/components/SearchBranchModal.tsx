import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface SearchBranchModalProps {
  onClose: () => void;
  onSubmit: (branchId: string, medId: string, amount: number) => void;
}

const SearchBranchModal: React.FC<SearchBranchModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [branchId, setBranchId] = useState("");
  const [medId, setMedId] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchId || !medId || amount <= 0) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/branches/request-med/${branchId}?med-id=${medId}&required-amount=${amount}`,
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ branchId, medId, amount }),
        }
      );

      if (response.ok) {
        onSubmit(branchId, medId, amount);
        onClose();
        alert("La solicitud fue realizada correctamente.");
      } else {
        setError("Error al realizar la solicitud. Inténtalo de nuevo.");
      }
    } catch (error) {
      setError("Ocurrió un error al procesar la solicitud.");
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-black"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mt-2">Buscar en Otra Sucursal</h2>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="branchId"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="ID de Sucursal"
            />
          </div>

          <div>
            <input
              type="text"
              name="medId"
              value={medId}
              onChange={(e) => setMedId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="ID del Medicamento"
            />
          </div>

          <div>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Cantidad Requerida"
              min={1}
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBranchModal;
