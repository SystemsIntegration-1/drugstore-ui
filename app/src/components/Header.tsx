import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FiMenu,
  FiShoppingCart,
  FiX,
  FiSearch,
  FiMapPin,
} from "react-icons/fi";
import Image from "next/image";
import icon from "../../icon.png";

interface HeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  cart: { id: number; name: string; image: string; price: string }[];
  onCartClick: () => void;
}

export default function Header({
  search,
  setSearch,
  cart,
  onCartClick,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchIconClick = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 p-4 shadow-md z-50">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>
          <button onClick={() => (window.location.href = "#")}>
            <Image src={icon} alt="Farmacorp Logo" width={100} height={50} />
          </button>
        </div>

        {!isMobile && (
          <div className="flex-1 mx-4">
            <div className="relative w-full">
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
        )}

        <div className="flex items-center space-x-4">
          {isMobile && (
            <button
              className="text-white text-2xl"
              onClick={handleSearchIconClick}
            >
              <FiSearch />
            </button>
          )}
          <button className="text-white text-2xl">
            <FiMapPin />
          </button>
          <button
            className="relative text-white text-2xl"
            onClick={onCartClick}
          >
            <FiShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {isMobile && showMobileSearch && (
        <div className="mt-4 px-4">
          <div className="relative w-full">
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
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-gray-700 text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <FiX />
        </button>
        <nav className="flex flex-col p-6 space-y-4 mt-10">
          <a href="#" className="px-4 py-2 hover:bg-gray-200">
            Ofertas
          </a>
          <a href="#" className="px-4 py-2 hover:bg-gray-200">
            Lo Nuevo
          </a>
        </nav>
      </div>

      <nav className="hidden lg:flex justify-start bg-blue-500 text-white p-2 mt-2">
        <a href="#" className="px-4 py-2 hover:bg-white hover:text-black">
          Ofertas
        </a>
        <a href="#" className="px-4 py-2 hover:bg-white hover:text-black">
          Lo Nuevo
        </a>
      </nav>
    </header>
  );
}
