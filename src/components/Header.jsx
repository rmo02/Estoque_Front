import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoLogoPlaystation } from "react-icons/io";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-color_blue w-full py-1 px-8 flex justify-between items-center">
      {/* Logo Mi*/}
      <div className="flex items-center"></div>

      {/* Nome da aplicação */}
      <div>
        <h2 className="text-white font-medium text-2xl">Estoque</h2>
      </div>

      {/* Avatar */}
      <div className="relative"></div>
    </header>
  );
}
