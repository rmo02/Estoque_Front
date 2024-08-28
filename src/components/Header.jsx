import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoLogoPlaystation } from "react-icons/io";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#001828] w-screen py-4 px-8 flex justify-between items-center">
      {/* Logo Mi*/}
      <div className="flex items-center">
        
      </div>

      {/* Nome da aplicação */}
      <div>
        <h2 className="text-white font-semibold text-2xl font-serif">Estoque</h2>
      </div>

      {/* Avatar */}
      <div className="relative">
       
      </div>
    </header>
  );
}
