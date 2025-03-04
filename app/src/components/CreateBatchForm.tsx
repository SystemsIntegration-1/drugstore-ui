import React, { useState } from "react";

interface CreateBatchFormProps {
  onClose: () => void;
}

export default function CreateBatchForm({ onClose }: CreateBatchFormProps) {
  const [formData, setFormData] = useState({
    productId: "",
    stock: 0,
    entryDate: "",
    expirationDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convertir las fechas a milisegundos (long)
    const entryDateMillis = new Date(formData.entryDate).getTime();
    const expirationDateMillis = new Date(formData.expirationDate).getTime();

    const formattedData = {
      ...formData,
      entryDate: entryDateMillis,
      expirationDate: expirationDateMillis,
    };

    try {
      const response = await fetch("http://localhost:5027/api/batches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        // Llamar a onClose para cerrar el modal después de enviar
        onClose();
        // Opcional: Mostrar un mensaje de éxito o hacer algo con la respuesta
        console.log("Lote creado exitosamente");
      } else {
        // Manejar errores en la respuesta del servidor
        console.error("Error al crear el lote", response.statusText);
      }
    } catch (error) {
      // Manejar cualquier error de red
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Crear Nuevo Lote</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ID del Producto</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min={0}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fecha de Entrada</label>
            <input
              type="date"
              name="entryDate"
              value={formData.entryDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Crear Lote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
