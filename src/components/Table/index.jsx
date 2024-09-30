import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Swal from 'sweetalert2'
import { app } from '../../api/api'
import { TypeOption } from '../../Hooks/TypeOption'
import { EditOption } from '../Modals/Option/EditOption'

export function Table({ searchTerm }) {
  const [dados, setDados] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [item, setItem] = useState('')
  const { options, isCategorias, isPrateleiras, isSecoes } = TypeOption()

  let typeUrl = isCategorias
    ? 'category'
    : isPrateleiras
    ? 'shelves'
    : isSecoes
    ? 'section'
    : ''

  let typeText = isCategorias
    ? 'categoria'
    : isPrateleiras
    ? 'prateleira'
    : isSecoes
    ? 'seção'
    : ''

  const capitalizedTypeText =
    typeText.charAt(0).toUpperCase() + typeText.slice(1)

  function deleteOption(id) {
    try {
      const response = app.delete(`/${typeUrl}/${id}`)
      Toast.fire({
        icon: 'error',
        title: `${capitalizedTypeText} excluída com sucesso`
      })

      // Atualizar o estado removendo o item excluído
      setDados(prevDados => prevDados.filter(item => item.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const showConfirmationToDelete = id => {
    Swal.fire({
      title: `Excluir ${typeText}`,
      text: `Você tem certeza que deseja excluir esta ${typeText}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await deleteOption(id) // Chamar função para deletar
        } catch (error) {
          console.error(`Erro ao excluir ${typeText}`, error)
          Toast.fire({
            icon: 'error',
            title: `Ocorreu um erro ao excluir ${typeText} a categoria. Tente novamente.`
          })
        }
      }
    })
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: toast => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    }
  })

  function openModal(items) {
    setModalIsOpen(true)
    setItem(items)
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
      width: '50%',
      height: '35%',
      borderRadius: '0.5rem'
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const sortedData = options.sort((a, b) => a.name.localeCompare(b.name))
        setDados(sortedData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }
    getData()
  }, [options])

  const filteredData = dados.filter(items =>
    items.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <table className="w-3/4">
        <thead>
          <tr>
            <th className="pr-2 py-2 text-left text-lg text-color_blue font-bold border-b border-color_blue">
              NOME
            </th>
            <th className="w-1/4 pr-2 py-2 text-left text-lg text-color_blue font-bold border-b border-color_blue">
              AÇÕES
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => {
            return (
              <tr key={index}>
                <td className="pr-2 py-2 border-b border-color_blue">
                  {item.name}
                </td>
                <td className="w-1/4 pr-2 py-2 border-b border-color_blue">
                  <div className="flex flex-row items-center justify-between space-x-2 text-white">
                    <button
                      className="cursor-pointer text-sm bg-color_green rounded-2xl w-full flex items-center justify-center py-1 px-2 transition duration-200 hover:bg-green-600"
                      onClick={() => openModal(item)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => showConfirmationToDelete(item.id)}
                      className="cursor-pointer text-sm bg-color_red rounded-2xl w-full flex items-center justify-center py-1 px-2 transition duration-200 hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={`Editar Nova ${typeText}`}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <EditOption closeModal={closeModal} item={item} />
      </Modal>
    </div>
  )
}
