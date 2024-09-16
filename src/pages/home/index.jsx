import { useEffect, useState } from 'react'
import { app } from '../../api/api'
import { Header } from '../../components/Header'
import { FaEdit, FaEye, FaSearch, FaTrash } from 'react-icons/fa'
import Modal from 'react-modal'
import logo from '../../assets/logo.png'
import { Card } from '../../components/Card'
import { AddItem } from '../../components/Modals/AddItem'

export function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [data, setData] = useState(['1'])
  const [pesquisar, setPesquisar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await app.get('/equipment')
      setCards(response.data)
    }
    getData()
  }, [])

  function openModal() {
    setModalIsOpen(true)
  }
  function closeModal() {
    setModalIsOpen(false)
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '40%',
      height: '75%',
      borderRadius: '0.5rem'
    }
  }
  const getEquipamentos = async () => {
    try {
      const res = await api.get('/', {})
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  function filtrarEquipamentos() {
    if (pesquisar === '') {
      return data
    } else {
      return data.filter(equipamento =>
        equipamento.Nome?.toLowerCase().includes(pesquisar.toLowerCase())
      )
    }
  }
  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 font-poppins">
      <Header />
      <div className="mx-10 my-3 flex justify-between items-center">
        <div
          className="cursor-pointer text-md px-12 py-1 bg-color_blue text-white rounded-2xl flex items-center justify-center"
          onClick={openModal}
        >
          Adicionar Item
        </div>
        <div className="bg-color_grey_bg flex flex-row items-center justify-between w-1/3 rounded-2xl ">
          <div className="cursor-pointer w-1/3 flex items-center justify-center">
            Prateleira
          </div>
          <div className="cursor-pointer w-1/3 flex items-center justify-center bg-color_blue text-white rounded-2xl py-1">
            Todos
          </div>
          <div className="cursor-pointer w-1/3 flex items-end justify-center">
            Seção
          </div>
        </div>
        <div className="flex flex-row items-center border px-6 py-1  bg-slate-100 border-gray-300 rounded-2xl">
          <input
            type="text"
            placeholder="Buscar equipamento"
            value={pesquisar}
            onChange={text => setPesquisar(text.target.value)}
            className=" text-slate-900 bg-slate-100 focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="text-indigo-600" />
        </div>
      </div>
      <div className="overflow-y-auto">
        <div className="w-full  px-10">
          <p className="text-lg">Prateleira</p>
          {/* Card */}
          {/* {filtrarEquipamentos().map((equipamento, i) => {
            return (
              <Card key={i} nomeProduto="Câmera" prateleira="01" posicao="A2" />
            )
          })} */}
          <div className="flex flex-row space-x-4">
            {cards.map((item, index) => {
              return <Card key={index} item={item} />
            })}
          </div>
        </div>
        <div className="w-full mt-3 px-10">
          <p className="text-lg">Seção</p>
          {/* Card */}
          {/* {filtrarEquipamentos().map((equipamento, i) => {
            return (
              <Card key={i} nomeProduto="Câmera" prateleira="01" posicao="A2" />
            )
          })} */}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Adicionar Novo Ítem"
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <AddItem closeModal={closeModal} />
      </Modal>
    </div>
  )
}
