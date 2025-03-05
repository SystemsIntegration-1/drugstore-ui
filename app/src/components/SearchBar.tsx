"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Buscando:", search); 
    onSearch(search); 
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          className="w-full px-4 py-2 rounded-md border focus:outline-none"
          value={search}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="absolute right-3 top-3 text-gray-500 text-xl focus:outline-none"
        >
          <FiSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
