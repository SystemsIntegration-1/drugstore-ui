import { FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import icon from "../../icon.png";

interface HeaderProps {
  cart: { id: number; name: string; price: string }[];
  onCartClick: () => void;
}

export default function Header({ cart, onCartClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 p-4 shadow-md z-50 flex justify-center">
      <div className="flex items-center justify-between w-full max-w-4xl px-4">
        {/* Logo */}
        <button onClick={() => (window.location.href = "#")}>
          <Image src={icon} alt="Farmacorp Logo" width={100} height={50} />
        </button>

        {/* Carrito */}
        <button className="relative text-white text-2xl" onClick={onCartClick}>
          <FiShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
