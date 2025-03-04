import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface EditProductModalProps {
  productId: string;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  productId,
  onClose,
}) => {
  const [productData, setProductData] = useState({
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

  useEffect(() => {
    const fetchProductData = async () => {
      if (productId) {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProductData(data);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", price: "", category: "", warehouseLocation: "" };

    if (!productData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!productData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (productData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
      isValid = false;
    }

    if (!productData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    if (!productData.warehouseLocation) {
      newErrors.warehouseLocation = "Warehouse location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      alert("Product updated successfully!");
      onClose();
    } else {
      alert("Error updating product");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
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

        <h2 className="text-2xl font-bold mt-2">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Name"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

          <div>
            <input
              type="text"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Description"
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

          <div>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Price"
              min={0}
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
          </div>

          <div>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Category"
            />
            {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
          </div>

          <div>
            <input
              type="text"
              name="warehouseLocation"
              value={productData.warehouseLocation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Warehouse Location"
            />
            {errors.warehouseLocation && <span className="text-red-500 text-sm">{errors.warehouseLocation}</span>}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
