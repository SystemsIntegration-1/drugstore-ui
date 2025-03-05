import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface AddProductModalProps {
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose }) => {
  const [productData, setProductData] = useState({
    sharedId: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    warehouseLocation: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    warehouseLocation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", price: "", category: "", warehouseLocation: "" };

    if (!productData.name) {
      newErrors.name = "El nombre es obligatorio";
      isValid = false;
    }

    if (!productData.description) {
      newErrors.description = "La descripción es obligatoria";
      isValid = false;
    }

    if (productData.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
      isValid = false;
    }

    if (!productData.category) {
      newErrors.category = "La categoría es obligatoria";
      isValid = false;
    }

    if (!productData.warehouseLocation) {
      newErrors.warehouseLocation = "La ubicación del almacén es obligatoria";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (response.ok) {
        alert("Producto agregado");
        onClose();
      } else {
        alert("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el producto");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-black"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mt-2">Agregar Producto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Nombre"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

          <div>
            <input
              type="text"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Descripción"
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

          <div>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Precio"
              min={0}
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
          </div>

          <div>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Categoría"
            />
            {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
          </div>

          <div>
            <input
              type="text"
              name="warehouseLocation"
              value={productData.warehouseLocation}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Ubicación del Almacén"
            />
            {errors.warehouseLocation && <span className="text-red-500 text-sm">{errors.warehouseLocation}</span>}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Guardar Producto
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
