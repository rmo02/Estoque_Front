import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { app } from '../../../api/api'

export function AddItem({ closeModal }) {
  const [name, setName] = useState('')
  const [naPrateleira, setNaPrateleira] = useState('true')
  const [prateleira, setPrateleira] = useState([])
  const [shelf, setShelf] = useState('')
  const [secao, setSecao] = useState([])
  const [section, setSection] = useState('')
  const [linha, setLinha] = useState('')
  const [coluna, setColuna] = useState('')
  const [posicao, setPosicao] = useState('')
  const [file, setFile] = useState('')
  const [status, setStatus] = useState('disponivel') // Define o estado para o status
  const [cards, setCards] = useState([])

  useEffect(() => {
    const getEquipments = async () => {
      const response = await app.get('/equipment')
      setCards(response.data)
    }
    const getShelves = async () => {
      const response = await app.get('/shelves')
      setPrateleira(response.data)
    }
    const getSections = async () => {
      const response = await app.get('/section')
      setSecao(response.data)
    }
    getEquipments()
    getShelves()
    getSections()
  }, [])
  console.log(name)
  console.log(naPrateleira)
  console.log(shelf)
  console.log(section)

  const handleAddItem = async () => {
    console.log('handle')

    try {
      const response = await app.post('/equipment', {
        name: name,
        inShelf: naPrateleira,
        shelfId: shelf,
        sectionID: section
      })
      if (response.status === 201) {
        console.log('deu certo')
      }
      if (response.status === 200) {
        console.log('deu certo')
      }
      console.log(response)
    } catch {
      alert('Erro.')
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center font-semibold">
        <p>Adicionar item</p>
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
                placeholder="Digite o nome do item"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label htmlFor="inputState">Tipo de Armazenamento</label>
              <select
                id="inputState"
                onChange={e => setNaPrateleira(e.target.value)}
                className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
              >
                <option disabled>Selecione o Tipo de Armazenamento</option>
                <option value="true">Prateleira</option>
                <option value="false">Seção</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center space-x-4 py-2 w-full">
            {naPrateleira === 'true' ? (
              <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
                <label htmlFor="inputState">Prateleira</label>
                <select
                  onChange={e => setShelf(e.target.value)}
                  id="inputState"
                  className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
                >
                  <option disabled>Selecione a Prateleira</option>
                  {prateleira
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item, index) => {
                      console.log(item.id)
                      return (
                        <option key={index + 1} value={item.id}>
                          {item.name}
                        </option>
                      )
                    })}
                </select>
              </div>
            ) : (
              <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
                <label htmlFor="inputState">Seção</label>
                <select
                  onChange={e => setSection(e.target.value)}
                  id="inputState"
                  className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
                >
                  <option disabled>Selecione a Seção</option>
                  {secao
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item, index) => {
                      return (
                        <option key={index + 1} value={item.id}>
                          {item.name}
                        </option>
                      )
                    })}
                </select>
              </div>
            )}

            {/* STATUS */}
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label htmlFor="inputState">Status</label>
              <select
                id="inputState"
                className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
              >
                <option disabled>Status</option>
                <option value="DISPONIVEL">Disponível</option>
                <option value="EM_USO">Em Uso</option>
                <option value="EM_MANUTENCAO">Em Manutenção</option>
              </select>
            </div>
          </div>

          {/* COLUNA E LINHA */}
          <div className="flex flex-row justify-between items-center space-x-4 py-2 w-full">
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label htmlFor="inputState">Coluna</label>
              <select
                id="inputState"
                className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
              >
                <option disabled>Selecione a Coluna</option>
                {[...Array(8)].map((item, index) => (
                  <option key={index + 1} value={index + 1}>
                    Coluna {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label htmlFor="inputState">Linha</label>
              <select
                id="inputState"
                className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
              >
                <option disabled>Selecione a Linha</option>
                {[...Array(8)].map((item, index) => (
                  <option key={index + 1} value={index + 1}>
                    Linha {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
        <div className="flex flex-row justify-end space-x-2 py-5">
          <button
            className="text-white bg-color_grey hover:opacity-80 rounded-md py-1 px-2"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            onClick={handleAddItem}
            className=" text-white bg-color_blue hover:opacity-80 rounded-md py-1 px-2"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
