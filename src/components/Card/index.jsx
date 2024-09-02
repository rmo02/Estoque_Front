import React from 'react'
import logo from '../../assets/logo.png'

export function Card({nomeProduto, prateleira, posicao}) {
  return (
    <div className="bg-color_blue w-1/4 flex flex-col text-white font-medium rounded-lg ">
      <img src={logo} alt="Foto do Equipamento" />
      <div className="p-3">
        <div className="flex justify-end">
          <div className="px-3 py-1 text-sm bg-color_green rounded-2xl ">
            Disponível
          </div>
        </div>
        <p className="text-xl ">{nomeProduto}</p>
        <p className="text-lg ">Prateleira {prateleira}</p>
        <p className="text-lg ">Posição {posicao}</p>
        <div className="flex flex-row items-center justify-center mt-2 space-x-2 ">
          <div className="cursor-pointer text-md bg-color_green rounded-2xl w-full flex items-center justify-center">
            Editar
          </div>
          <div className="cursor-pointer text-md bg-color_red rounded-2xl w-full flex items-center justify-center">
            Excluir
          </div>
        </div>
      </div>
    </div>
    
  )
}
