"use client";

import { useState } from "react";
import Header from "./src/components/Header";
import ProductList from "./src/components/ProductList";
import ProductDetail from "./src/components/ProductDetails";
import CartModal from "./src/components/CartModal";
import { mockProducts } from "./src/data/products";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; image: string; price: string } | null>(null);
  const [cart, setCart] = useState<{ id: number; name: string; image: string; price: string; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  const addToCart = (product: { id: number; name: string; image: string; price: string }) => {
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

  return (
    <div className="min-h-screen pt-16">
      <Header
        search={search}
        setSearch={setSearch}
        cart={cart}
        onCartClick={() => setShowCart(true)}
      />
      <ProductList search={search} products={mockProducts} onSelectProduct={setSelectedProduct} />

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
