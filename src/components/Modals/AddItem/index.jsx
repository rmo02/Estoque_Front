import { useState } from 'react'
import { MdClose } from 'react-icons/md'

export function AddItem({ closeModal }) {
  const [name, setName] = useState('')
  const [naPrateleira, setNaPrateleira] = useState('true')
  const [prateleira, setPrateleira] = useState('')
  const [secao, setSecao] = useState('')
  const [linha, setLinha] = useState('')
  const [coluna, setColuna] = useState('')
  const [posicao, setPosicao] = useState('')
  const [file, setFile] = useState('')

  const handleChangeSelect = e => {
    setNaPrateleira(e.target.value)
    setLinha('')
    setColuna('')
    setSecao('')
    setPosicao('')
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center font-semibold">
        <p>Adicionar Ítem</p>
        <img src={file} alt="" />
        <MdClose
          className="cursor-pointer hover:bg-color_grey_bg hover:rounded-full"
          onClick={closeModal}
        />
      </div>
      <p>Preencha os campos abaixo para adicionar um novo item ao estoque</p>
      <form>
        <div>
          <div className="flex flex-row justify-between items-center space-x-4 py-2 w-full">
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label htmlFor="Name">Nome</label>
              <input
                type="name"
                className="border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue w-full text-sm"
                id="Name"
                placeholder="Digite o nome do ítem"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label htmlFor="inputState">Tipo de Armazenamento</label>
              <select
                id="inputState"
                onChange={handleChangeSelect}
                className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
              >
                <option disabled>Selecione o Tipo de Armazenamento</option>
                <option value="true">Prateleira</option>
                <option value="false">Seção</option>
              </select>
            </div>
          </div>
          {naPrateleira === 'true' ? (
            <div className="flex flex-row justify-between items-center space-x-4 py-2 w-full">
              <div className="flex flex-col space-y-1 w-1/2">
                <label htmlFor="Colum">Coluna</label>
                <input
                  type="text"
                  className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
                  id="Colum"
                  value={coluna}
                  placeholder="Digite a coluna do ítem"
                  onChange={e => setColuna(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1 w-1/2">
                <label htmlFor="Line">Linha</label>
                <input
                  type="text"
                  className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
                  id="Line"
                  value={linha}
                  placeholder="Digite a seção do ítem"
                  onChange={e => setLinha(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center space-x-4 py-2 w-full">
              <div className="flex flex-col space-y-1 w-1/2">
                <label htmlFor="Section">Seção</label>
                <input
                  type="text"
                  className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
                  id="Section"
                  value={secao}
                  placeholder="Digite a seção do ítem"
                  onChange={e => setSecao(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1 w-1/2">
                <label htmlFor="Position">Posição</label>
                <input
                  type="text"
                  className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
                  id="Position"
                  value={posicao}
                  placeholder="Digite a Posição do ítem"
                  onChange={e => setPosicao(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start w-full space-y-1">
          <label htmlFor="Image">Imagem</label>
          <input
            type="file"
            className="cursor-pointer"
            id="Image"
            onChange={e => setFile(e.target.files[0])}
          />
        </div>
        <div>
          <div className="flex flex-col justify-start py-2 space-y-1 w-full">
            <p className="font-semibold">Status</p>

            <div className="flex flex-row justify-start items-center w-full space-x-5">
              <div className="flex flex-row items-center w-1/4 space-x-2">
                <input
                  className="h-3 w-3 rounded-full appearance-none border-2 border-gray-400 checked:bg-color_blue"
                  type="checkbox"
                  id="checkboxDisponivel"
                  value="disponivel"
                />
                <label
                  className="flex items-center"
                  htmlFor="checkboxDisponivel"
                >
                  Disponível
                </label>
              </div>
              <div className="flex flex-row items-center w-1/4 space-x-2">
                <input
                  className="h-3 w-3 rounded-full appearance-none border-2 border-gray-400 checked:bg-color_blue"
                  type="checkbox"
                  id="checkboxEmUso"
                  value="emUso"
                />
                <label className="flex items-center" htmlFor="checkboxEmUso">
                  Em Uso
                </label>
              </div>
              <div className="flex flex-row items-center w-1/4 space-x-2">
                <input
                  className="h-3 w-3 rounded-full appearance-none border-2 border-gray-400 checked:bg-color_blue"
                  type="checkbox"
                  id="checkboxEmManutencao"
                  value="emManutencao"
                />
                <label
                  className="flex items-center"
                  htmlFor="checkboxEmManutencao"
                >
                  Manutenção
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end space-x-2 py-5">
          <button
            className="text-white bg-color_grey hover:opacity-80 rounded-md py-1 px-2"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className=" text-white bg-color_blue hover:opacity-80 rounded-md py-1 px-2"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
