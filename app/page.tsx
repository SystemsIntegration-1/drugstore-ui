"use client";

import { useState } from "react";
import Header from "./src/components/Header";
import ProductList from "./src/components/ProductList";
import ProductDetail from "./src/components/ProductDetails";
import CartModal from "./src/components/CartModal";
import { mockProducts } from "./src/data/products";
import { FiSearch } from "react-icons/fi";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; price: string; stock: number } | null>(null);
  const [cart, setCart] = useState<{ id: number; name: string; price: string; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  const addToCart = (product: { id: number; name: string; price: string }) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Filtrar productos basados en la búsqueda
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <Header cart={cart} onCartClick={() => setShowCart(true)} />

      {/* Buscador debajo del header */}
      <div className="flex justify-center mt-4">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="w-full px-4 py-2 rounded-md border focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="absolute right-3 top-3 text-gray-500 text-xl" />
        </div>
      </div>

      {/* Centrado de los productos */}
      <div className="flex justify-center mt-8">
        <ProductList search={search} products={filteredProducts} onSelectProduct={(product) => setSelectedProduct(product)} />
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => addToCart(selectedProduct)}
        />
      )}

      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateCart={updateCartQuantity}
          onRemoveFromCart={removeFromCart}
        />
      )}
    </div>
  );
}
