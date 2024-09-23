import { useState } from 'react'

export function Header() {
  return (
    <header className="bg-color_blue w-full py-1 px-8 flex justify-between items-center">
      {/* Logo Mi*/}
      <div className="flex items-center"></div>

      {/* Nome da aplicação */}
      <div>
        <h2 className="text-white font-medium text-xl">Estoque</h2>
      </div>

      {/* Avatar */}
      <div className="relative"></div>
    </header>
  )
}
