"use client"; // Añadir esta línea al principio del archivo

import { useState } from "react";
import Header from "./src/components/Header";
import ProductList from "./src/components/ProductList";
import ProductDetail from "./src/components/ProductDetails";
import CartModal from "./src/components/CartModal";
import SearchBar from "./src/components/SearchBar"; // Importamos el componente SearchBar

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  warehouseLocation: string;
  sharedId: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  // Función para buscar productos desde la API
  const searchProducts = (query: string) => {
    if (query.trim() === "") {
      setProducts([]); 
      return;
    }

    fetch(`http://localhost:5027/api/products/search/${query}`, {
      method: "GET",
      headers: {
        "Accept": "*/*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data); 
        } else {
          setProducts([]); 
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); 
      });
  };

  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <Header cart={cart} onCartClick={() => setShowCart(true)}  />

      {/* Componente de búsqueda */}
      <SearchBar onSearch={searchProducts} />

      {/* Centrado de los productos */}
      <div className="flex justify-center mt-8">
        <ProductList
          products={products}
          onSelectProduct={(product) => setSelectedProduct(product)} 
        />
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
